import { Body, Controller, Post } from '@nestjs/common';
import { kontratService, } from './kontrat.service';
import { Keypair, PublicKey } from '@solana/web3.js';

enum VoteOption {
  Yes,
  No,
  Any
}


@Controller('kontrat')
export class KontratController {
    constructor(private readonly solanaService: kontratService) {}

    @Post('createP')
    async createProposal(@Body('proposalUid') proposalUid: string,@Body('pubkey') pubkey : string): Promise<void> {
      await this.solanaService.createProposal(proposalUid, pubkey);
    }
    @Post('voteP')
    async voteProposal(@Body('proposalUid') proposalUid: string,@Body('vote') vote : VoteOption): Promise<void> {
      console.log(vote)
      await this.solanaService.voteProposal(proposalUid, vote);
    }
    @Post('getProposal')
    async getProposal(@Body('proposalUid') proposalUid: string): Promise<void> {
      await this.solanaService.getProposal(proposalUid);
    }
}


