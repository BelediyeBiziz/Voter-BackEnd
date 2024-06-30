import { Injectable } from '@nestjs/common';
import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import { IDL } from './voting_system_idl'; // IDL dosyasını doğru şekilde import ettiğinizden emin olun
import { Keypair, Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { buffer } from 'stream/consumers';
import * as borsh from '@dao-xyz/borsh';
import { field, option, vec } from '@dao-xyz/borsh';
import { Idl } from '@coral-xyz/anchor';
enum VoteOption {
  Yes,No,Any
}


class SomeClass 
{
    @field({type: 'u64'})
    y: bigint

    constructor(data: SomeClass)
    {
       Object.assign(this, data)
    }
}




@Injectable()
export class kontratService {


    private program: Program;

    constructor() {
        try {
            const provider = anchor.AnchorProvider.local();
            anchor.setProvider(provider);

            // IDL içeriğini program'a yükle
            this.program = new anchor.Program(IDL, IDL.metadata.address, provider);
            
            console.log('Program initialized successfully:', this.program.programId.toBase58());
        } catch (error) {
            console.error('Error in KontratService constructor:', error);
        }
    }

    async createProposal(proposalUid: string,pubkey : any): Promise<void> {
        try {
            const connection = new Connection('http://localhost:8899');
            const user = Keypair.generate();
            
            // Airdrop işlemi
            const sig = await connection.requestAirdrop(user.publicKey, 10000000000);
            await connection.confirmTransaction(sig);

            console.log('User account created successfully:', user.publicKey.toBase58());
            console.log('User account balance:', await connection.getBalance(user.publicKey));
            console.log();
            const acc =await PublicKey.findProgramAddressSync(
              [Buffer.from(proposalUid)],
              this.program.programId
            );
            console.log(acc)

            const acc2 = await PublicKey.findProgramAddressSync(
              [Buffer.from(proposalUid),user.publicKey.toBuffer()],
              this.program.programId
            );
          
          
            // Proposal oluşturma işlemi
            const transaction = await this.program.rpc.createProposal(proposalUid, {
                accounts: {
                  proposal: acc[0],
                  userProposalVote: acc2[0],
                    user: user.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
                signers: [user],
            });

            console.log('Proposal created successfully:', transaction);
            await connection.confirmTransaction(transaction);
            console.log(await connection.getBalance(user.publicKey));
        } catch (error) {
            console.error('Error while creating proposal:', error);
        }
    }

    async voteProposal(proposalUid: string, voteOption: VoteOption): Promise<void> {
      try {
        const connection = new Connection('http://localhost:8899');
        const user = Keypair.generate();
       
        // Airdrop işlemi
        const sig = await connection.requestAirdrop(user.publicKey, 1000000000);
        await connection.confirmTransaction(sig);
    
        console.log('User account created successfully:', user.publicKey.toBase58());
        console.log('User account balance:', await connection.getBalance(user.publicKey));
        console.log();
    
        const [proposalAddress] = await PublicKey.findProgramAddressSync(
          [Buffer.from(proposalUid)],
          this.program.programId
        );
        const [userVoteAddress] = await PublicKey.findProgramAddressSync(
          [Buffer.from(proposalUid), user.publicKey.toBuffer()],
          this.program.programId
        );
    
        console.log('Proposal Address:', proposalAddress.toBase58());
        console.log('User Vote Address:', userVoteAddress.toBase58());
    
        //VoteOption'ı serileştirin
        const transaction = await this.program.methods.voteProposal(proposalUid, String("Yes")).accounts({
          proposal: proposalAddress,
          userProposalVote: userVoteAddress,
          user: user.publicKey,
        }).signers([user]).rpc();
        

        //await connection.sendTransaction(transaction,[user]);

        console.log('Vote given successfully:', transaction);
        await connection.confirmTransaction(transaction,'confirmed');
        console.log(await connection.getBalance(user.publicKey));
      } catch (error) {
        console.error('Error while voting proposal:', error);
      }
    }




async getProposal(proposalUid: string): Promise<any> {
  try {
      const [proposalAddress] = await PublicKey.findProgramAddress(
          [Buffer.from(proposalUid)],
          this.program.programId,
      );

      const proposalAccount = await this.program.account.proposal.fetch(proposalAddress);

      console.log('Proposal Account:', proposalAccount.yesVotes.toString(), proposalAccount.noVotes.toString());
      return proposalAccount;
  } catch (error) {
      console.error('Error while fetching proposal:', error);
  }
}

async getUserVote(proposalUid: string, userPublicKey: PublicKey): Promise<any> {
  try {
      const [userVoteAddress] = await PublicKey.findProgramAddress(
          [Buffer.from(proposalUid), userPublicKey.toBuffer()],
          this.program.programId,
      );

      const userVoteAccount = await this.program.account.myVote.fetch(userVoteAddress);

      console.log('User Vote Account:', userVoteAccount);
      return userVoteAccount;
  } catch (error) {
      console.error('Error while fetching user vote:', error);
  }
}
}












