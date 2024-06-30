import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get('user')
  // getuserfromorg() {
  //   return this.appService.getuserfromorg();
  // }
  // @Get('getProposal')
  // getProposal(@Query('pubkey') pubkey : string,@Body() joinOrg : any) {
  //   return this.appService.getProposal(pubkey,joinOrg);
  // }
  // @Post('createProposal')
  // createProposal(@Query('pubKey') pubkey : string , @Body() proposal : any) {
  //   return this.appService.createProposal(pubkey,proposal);
  // }
  // @Get('checkOrganization')
  // checkOrganization(@Query('pubkey') pubkey : string) {
  //   return this.appService.checkOrganization(pubkey);
  // }
  // @Post('deneme')
  // createOrganization(@Body() organization : any) {
  //   return this.appService.createOrganization(organization);
  // }
  // @Post('joinOrganization')
  // joinOrganization(@Query('pubkey') pubkey : string, @Body() joinOrg : any) {
  //   return this.appService.joinOrganization(pubkey,joinOrg);
  // }
  // @Post('createUser')
  // createUser(@Body() user : any) {
  //   return this.appService.createUser(user);
  // }
}
