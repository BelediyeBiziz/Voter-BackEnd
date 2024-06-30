import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebService } from './web.service';
import { query } from 'express';
@Controller('web')
export class WebController {
    constructor(private readonly webService: WebService) {}

    @Post('createProposal')
    createProposal(@Query('pubKey') pubkey : string , @Body() proposal : any) {
      return this.webService.createProposal(pubkey,proposal);
    }
    @Get('checkOrganization')
    checkOrganization(@Query('pubkey') pubkey : string) {
      return this.webService.checkOrganization(pubkey);
    }
    @Post('createOrganization')
    createOrganization(@Body() organization : any) {
      return this.webService.createOrganization(organization);
    }
    @Post('sso')
    createSso(@Body() gmail : any) {
      return this.webService.sso(gmail);
    }
    @Post('ssoPublicAddress')
    createSsoPublicAddress(@Body() email : any) {
      return this.webService.ssoPublicAddress(email);
    }

}
