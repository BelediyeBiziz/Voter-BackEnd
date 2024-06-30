import { Injectable } from '@nestjs/common';
import { dbService } from '../db-service/db-service.service';
import { NotFoundError } from 'rxjs';
import { WalletService } from 'src/wallet/wallet.service';
import { log } from 'console';
@Injectable()
export class WebService {
    constructor(private dbService: dbService) {}
    async createProposal(pubKey : string,proposal: any) {
      const {title,description,organizationId} = proposal;
      // burdaki kodlar şimdilik bi işe yaramıyor
     // const user = await this.dbService.users.findUnique({ where: { public_key: pubKey } });

      //  const org = await this.dbService.organizations.findUnique({ where: { id: organizationId } });
        console.log(proposal);
        const newProposal = await this.dbService.proposals.create({ data: { organization_id: Number(organizationId), title: title,description: description,} });
        return newProposal;
      }
    
      async checkOrganization(pubkey : string) {
        
        console.log(pubkey)
        const org = await this.dbService.organizations.findUnique({ where: { public_key: pubkey } });
        if(org == null) {
        throw new NotFoundError("Organization not found");
        }
        return org.id;
      }
    
      async createOrganization(organization: any) {
        const newOrganization = await this.dbService.organizations.create({ data: { name: organization.name, public_key: organization.public_key } });
        return { public_key: newOrganization.public_key , org_title: newOrganization.name };
      }
      async sso(mail: any) {
        const walletservice = new WalletService(this.dbService);
        const { gmail } = mail;
        console.log(gmail + " gmail adresi budur");
        const deneme = await this.dbService.users.findUnique({ where: {gmail : gmail} });
        if(deneme == null) {
          
         return walletservice.createWallet(gmail);
        }
        return {message : deneme.public_key + "public keyi ile zaten kayıtlı bi gmail adresi"};
      }
      async ssoPublicAddress(mail: any) {
        const {gmail} = mail;
        console.log(gmail + " gmail isteği geldi")
        const user = await this.dbService.users.findUnique({ where: {gmail : gmail} });
        if(user != null) {
        return {walletAddress : user.public_key};
        }
        else {
          return {message : "Kullanıcı bulunamadı"};
        }
}
      }
    
