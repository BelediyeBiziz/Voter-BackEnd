import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MobileService } from './mobile.service';
@Controller('mobile')
export class MobileController {
    constructor(private readonly mobileService: MobileService) {}
    @Get('getProposals')
  getProposal(@Query('pubkey') pubkey : string,@Body() joinOrg : any) {
    return this.mobileService.getProposal(pubkey,joinOrg);
}
    @Post('joinOrganization')
  joinOrganization(@Query('pubkey') pubkey : string, @Body() joinOrg : any) {
    return this.mobileService.joinOrganization(pubkey,joinOrg);
  }
  @Post('createUser')
  createUser(@Body() user : any) {
    return this.mobileService.createUser(user);
  }
  @Post('sso')
    createSso(@Body() email : any) {
      return this.mobileService.sso(email);
  

}}
