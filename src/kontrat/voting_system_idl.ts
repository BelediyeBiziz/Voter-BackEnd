import { Idl } from '@project-serum/anchor';

export const IDL: Idl = {
  
    "version": "0.1.0",
    "name": "voting_system",
    "instructions": [
      {
        "name": "createProposal",
        "accounts": [
          {
            "name": "proposal",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userProposalVote",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "proposalUid",
            "type": "string"
          }
        ]
      },
      {
        "name": "voteProposal",
        "accounts": [
          {
            "name": "proposal",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "userProposalVote",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          }
        ],
        "args": [
          {
            "name": "proposalUid",
            "type": "string"
          },
          {
            "name": "vote",
            "type": {
              "defined": "VoteOption"
            }
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "Proposal",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "proposalUid",
              "type": "string"
            },
            {
              "name": "yesVotes",
              "type": "u64"
            },
            {
              "name": "noVotes",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "MyVote",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "vote",
              "type": {
                "defined": "VoteOption"
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "VoteOption",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "Yes"
            },
            {
              "name": "No"
            },
            {
              "name": "Any"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "InvalidVoteOption",
        "msg": "The provided vote option is invalid."
      }
    ],
    "metadata": {
      "address": "jseSEeYKJfTAiD9S4bSqSCNWPeGty826JMSG1iPsmxR"
    }
  
  
};
