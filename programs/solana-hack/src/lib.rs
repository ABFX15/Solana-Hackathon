use anchor_lang::prelude::*;

// Program ID
declare_id!("59NDRZgvKZGNT8Rb3J6ShHTkJQzmnrpUZgPCxDu7M47e");

#[program]
pub mod solana_hack {
    use super::*;

    /// List a new bandwidth slot for auction
    pub fn list_bandwidth(
        ctx: Context<ListBandwidth>,
        speed_mbps: u64,
        start_time: i64,
        auction_end_time: i64,
        min_bid: u64,
    ) -> Result<()> {
        let slot = &mut ctx.accounts.bandwidth_slot;
        slot.validator = *ctx.accounts.validator.key;
        slot.speed_mbps = speed_mbps;
        slot.start_time = start_time;
        slot.auction_end_time = auction_end_time;
        slot.min_bid = min_bid;
        slot.winning_bid = None;
        slot.winner = None;
        slot.closed = false;
        slot.claimed = false;
        emit!(BandwidthListed {
            validator: *ctx.accounts.validator.key,
            slot: ctx.accounts.bandwidth_slot.key(),
            speed_mbps,
            start_time,
            auction_end_time,
            min_bid,
        });
        Ok(())
    }

    /// Place a bid on a bandwidth slot. Refund previous bidder if outbid.
    pub fn bid(
        ctx: Context<Bid>,
        bid_amount: u64,
    ) -> Result<()> {
        let clock = Clock::get()?;
        require!(!ctx.accounts.bandwidth_slot.closed, CustomError::AuctionClosed);
        require!(clock.unix_timestamp < ctx.accounts.bandwidth_slot.auction_end_time, CustomError::AuctionEnded);
        require!(bid_amount >= ctx.accounts.bandwidth_slot.min_bid, CustomError::BidTooLow);
        if let Some(current_bid) = ctx.accounts.bandwidth_slot.winning_bid {
            require!(bid_amount > current_bid, CustomError::BidTooLow);
        }
        // Refund previous bidder if any
        if let (Some(prev_bid), Some(prev_winner)) = (
            ctx.accounts.bandwidth_slot.winning_bid,
            ctx.accounts.bandwidth_slot.winner,
        ) {
            let prev_winner_account = ctx.accounts.prev_winner.as_ref().ok_or(CustomError::MissingRefundAccount)?;
            require!(prev_winner == *prev_winner_account.key, CustomError::RefundAccountMismatch);
            // Transfer from escrow PDA to previous winner
            let slot_key_bytes = ctx.accounts.bandwidth_slot.key().to_bytes();
            let bump = [ctx.bumps.escrow];
            let escrow_prefix: &[u8] = b"escrow";
            let slot_key_ref: &[u8] = slot_key_bytes.as_ref();
            let bump_ref: &[u8] = &bump;
            let escrow_seeds: [&[u8]; 3] = [escrow_prefix, slot_key_ref, bump_ref];
            let escrow_seeds_slice: &[&[u8]] = &escrow_seeds;
            let seeds = [escrow_seeds_slice];
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.escrow.to_account_info(),
                    to: prev_winner_account.to_account_info(),
                },
                &seeds,
            );
            anchor_lang::system_program::transfer(cpi_ctx, prev_bid)?;
        } else {
            require!(ctx.accounts.prev_winner.is_none(), CustomError::UnexpectedRefundAccount);
        }
        // Transfer SOL from bidder to escrow PDA
        let cpi_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.bidder.to_account_info(),
                to: ctx.accounts.escrow.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_ctx, bid_amount)?;
        // Now mutate slot fields
        let slot = &mut ctx.accounts.bandwidth_slot;
        slot.winning_bid = Some(bid_amount);
        slot.winner = Some(*ctx.accounts.bidder.key);
        emit!(BidPlaced {
            slot: ctx.accounts.bandwidth_slot.key(),
            bidder: *ctx.accounts.bidder.key,
            bid_amount,
        });
        Ok(())
    }

    /// Close the auction. Only the validator can close after auction end time.
    pub fn close_auction(ctx: Context<CloseAuction>) -> Result<()> {
        let clock = Clock::get()?;
        require!(!ctx.accounts.bandwidth_slot.closed, CustomError::AuctionClosed);
        require!(clock.unix_timestamp >= ctx.accounts.bandwidth_slot.auction_end_time, CustomError::AuctionNotEnded);
        require!(ctx.accounts.bandwidth_slot.validator == *ctx.accounts.validator.key, CustomError::NotValidator);
        // Capture immutable values before mutable borrow
        let slot_key = ctx.accounts.bandwidth_slot.key();
        let winner = ctx.accounts.bandwidth_slot.winner;
        let winning_bid = ctx.accounts.bandwidth_slot.winning_bid;
        // Now mutate slot fields
        let slot = &mut ctx.accounts.bandwidth_slot;
        slot.closed = true;
        emit!(AuctionClosed {
            slot: slot_key,
            winner,
            winning_bid,
        });
        Ok(())
    }

    /// Claim the winning bid funds. Only the validator can claim after auction is closed.
    pub fn claim_funds(ctx: Context<ClaimFunds>) -> Result<()> {
        require!(ctx.accounts.bandwidth_slot.closed, CustomError::AuctionNotClosed);
        require!(!ctx.accounts.bandwidth_slot.claimed, CustomError::AlreadyClaimed);
        require!(ctx.accounts.bandwidth_slot.validator == *ctx.accounts.validator.key, CustomError::NotValidator);
        if let Some(winning_bid) = ctx.accounts.bandwidth_slot.winning_bid {
            // Transfer from escrow PDA to validator
            let slot_key_bytes = ctx.accounts.bandwidth_slot.key().to_bytes();
            let bump = [ctx.bumps.escrow];
            let escrow_prefix: &[u8] = b"escrow";
            let slot_key_ref: &[u8] = slot_key_bytes.as_ref();
            let bump_ref: &[u8] = &bump;
            let escrow_seeds: [&[u8]; 3] = [escrow_prefix, slot_key_ref, bump_ref];
            let escrow_seeds_slice: &[&[u8]] = &escrow_seeds;
            let seeds = [escrow_seeds_slice];
            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.escrow.to_account_info(),
                    to: ctx.accounts.validator.to_account_info(),
                },
                &seeds,
            );
            anchor_lang::system_program::transfer(cpi_ctx, winning_bid)?;
        }
        // Capture immutable values before mutable borrow
        let slot_key = ctx.accounts.bandwidth_slot.key();
        let validator_key = *ctx.accounts.validator.key;
        let amount = ctx.accounts.bandwidth_slot.winning_bid.unwrap_or(0);
        // Now mutate slot fields
        let slot = &mut ctx.accounts.bandwidth_slot;
        slot.claimed = true;
        emit!(FundsClaimed {
            slot: slot_key,
            validator: validator_key,
            amount,
        });
        Ok(())
    }
}

#[derive(Accounts)]
pub struct ListBandwidth<'info> {
    #[account(init, payer = validator, space = 8 + BandwidthSlot::LEN)]
    pub bandwidth_slot: Account<'info, BandwidthSlot>,
    #[account(mut)]
    pub validator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Bid<'info> {
    #[account(mut)]
    pub bandwidth_slot: Account<'info, BandwidthSlot>,
    #[account(mut)]
    pub bidder: Signer<'info>,
    /// CHECK: Only required if there is a previous winner. Must match slot.winner.
    #[account(mut)]
    pub prev_winner: Option<AccountInfo<'info>>,
    /// PDA escrow for this auction
    #[account(
        mut,
        seeds = [b"escrow", bandwidth_slot.key().as_ref()],
        bump
    )]
    pub escrow: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseAuction<'info> {
    #[account(mut, has_one = validator)]
    pub bandwidth_slot: Account<'info, BandwidthSlot>,
    #[account(mut)]
    pub validator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimFunds<'info> {
    #[account(mut, has_one = validator)]
    pub bandwidth_slot: Account<'info, BandwidthSlot>,
    #[account(mut)]
    pub validator: Signer<'info>,
    /// PDA escrow for this auction
    #[account(
        mut,
        seeds = [b"escrow", bandwidth_slot.key().as_ref()],
        bump
    )]
    pub escrow: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct BandwidthSlot {
    pub validator: Pubkey,
    pub speed_mbps: u64,
    pub start_time: i64,
    pub auction_end_time: i64,
    pub min_bid: u64,
    pub winning_bid: Option<u64>,
    pub winner: Option<Pubkey>,
    pub closed: bool,
    pub claimed: bool,
}

// Option<u64> and Option<Pubkey> are 9 and 33 bytes respectively in Anchor
impl BandwidthSlot {
    pub const LEN: usize = 32 + 8 + 8 + 8 + 8 + 9 + 33 + 1 + 1;
}

#[event]
pub struct BandwidthListed {
    pub validator: Pubkey,
    pub slot: Pubkey,
    pub speed_mbps: u64,
    pub start_time: i64,
    pub auction_end_time: i64,
    pub min_bid: u64,
}

#[event]
pub struct BidPlaced {
    pub slot: Pubkey,
    pub bidder: Pubkey,
    pub bid_amount: u64,
}

#[event]
pub struct AuctionClosed {
    pub slot: Pubkey,
    pub winner: Option<Pubkey>,
    pub winning_bid: Option<u64>,
}

#[event]
pub struct FundsClaimed {
    pub slot: Pubkey,
    pub validator: Pubkey,
    pub amount: u64,
}

#[error_code]
pub enum CustomError {
    #[msg("Bid is too low.")]
    BidTooLow,
    #[msg("Auction is already closed.")]
    AuctionClosed,
    #[msg("Auction has ended.")]
    AuctionEnded,
    #[msg("Auction has not ended yet.")]
    AuctionNotEnded,
    #[msg("Auction is not closed.")]
    AuctionNotClosed,
    #[msg("Funds already claimed.")]
    AlreadyClaimed,
    #[msg("Not the validator.")]
    NotValidator,
    #[msg("Missing refund account.")]
    MissingRefundAccount,
    #[msg("Refund account does not match previous winner.")]
    RefundAccountMismatch,
    #[msg("Unexpected refund account provided.")]
    UnexpectedRefundAccount,
}
