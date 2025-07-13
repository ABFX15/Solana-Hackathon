export const IDL = {
    "address": "59NDRZgvKZGNT8Rb3J6ShHTkJQzmnrpUZgPCxDu7M47e",
    "metadata": {
        "name": "solana_hack",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "bid",
            "docs": [
                "Place a bid on a bandwidth slot. Refund previous bidder if outbid."
            ],
            "discriminator": [199, 56, 85, 38, 146, 186, 46, 203],
            "accounts": [
                {
                    "name": "bandwidth_slot",
                    "writable": true
                },
                {
                    "name": "bidder",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "prev_winner",
                    "writable": true,
                    "optional": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "claim_funds",
            "docs": [
                "Claim auction funds (validator only, after auction ends)"
            ],
            "discriminator": [13, 64, 231, 135, 10, 58, 81, 55],
            "accounts": [
                {
                    "name": "bandwidth_slot",
                    "writable": true
                },
                {
                    "name": "validator",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "close_auction",
            "docs": [
                "Close an auction (validator only, after auction ends)"
            ],
            "discriminator": [37, 223, 144, 39, 190, 251, 100, 218],
            "accounts": [
                {
                    "name": "bandwidth_slot",
                    "writable": true
                },
                {
                    "name": "validator",
                    "signer": true
                }
            ],
            "args": []
        },
        {
            "name": "list_bandwidth",
            "docs": [
                "List a new bandwidth slot for auction"
            ],
            "discriminator": [219, 24, 125, 98, 95, 86, 168, 99],
            "accounts": [
                {
                    "name": "bandwidth_slot",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "validator",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "speed_mbps",
                    "type": "u32"
                },
                {
                    "name": "start_time",
                    "type": "i64"
                },
                {
                    "name": "auction_end_time",
                    "type": "i64"
                },
                {
                    "name": "min_bid",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "BandwidthSlot",
            "discriminator": [12, 165, 193, 111, 235, 80, 102, 188],
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "validator",
                        "type": "pubkey"
                    },
                    {
                        "name": "speed_mbps",
                        "type": "u32"
                    },
                    {
                        "name": "start_time",
                        "type": "i64"
                    },
                    {
                        "name": "auction_end_time",
                        "type": "i64"
                    },
                    {
                        "name": "min_bid",
                        "type": "u64"
                    },
                    {
                        "name": "current_bid",
                        "type": "u64"
                    },
                    {
                        "name": "winner",
                        "type": {
                            "option": "pubkey"
                        }
                    },
                    {
                        "name": "winning_bid",
                        "type": "u64"
                    },
                    {
                        "name": "closed",
                        "type": "bool"
                    },
                    {
                        "name": "claimed",
                        "type": "bool"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "AuctionClosed",
            "discriminator": [44, 175, 196, 141, 16, 85, 209, 159]
        },
        {
            "name": "BandwidthListed",
            "discriminator": [165, 88, 140, 197, 112, 111, 51, 207]
        },
        {
            "name": "BidPlaced",
            "discriminator": [67, 158, 63, 222, 154, 115, 143, 234]
        },
        {
            "name": "FundsClaimed",
            "discriminator": [251, 103, 12, 57, 117, 253, 225, 50]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "AuctionNotStarted",
            "msg": "Auction has not started yet"
        },
        {
            "code": 6001,
            "name": "AuctionEnded",
            "msg": "Auction has already ended"
        },
        {
            "code": 6002,
            "name": "BidTooLow",
            "msg": "Bid is below minimum or current bid"
        },
        {
            "code": 6003,
            "name": "AuctionNotEnded",
            "msg": "Auction has not ended yet"
        },
        {
            "code": 6004,
            "name": "Unauthorized",
            "msg": "Only validator can perform this action"
        },
        {
            "code": 6005,
            "name": "AuctionNotClosed",
            "msg": "Auction must be closed before claiming funds"
        },
        {
            "code": 6006,
            "name": "AlreadyClaimed",
            "msg": "Funds have already been claimed"
        }
    ],
    "types": []
} as const; 