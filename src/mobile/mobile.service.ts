import { Injectable, Logger } from '@nestjs/common';
import { dbService } from '../db-service/db-service.service';
import { WalletService } from 'src/wallet/wallet.service';
@Injectable()
export class MobileService {
    constructor(private readonly dbService: dbService) {}
    // Kullanıcı oluşturma
    async createUser(user: any) {

       const {public_key} = user;
        
       if(await this.dbService.users.findUnique({ where: { public_key: public_key } })) {
          return {message : "User already exists"};
        }
        const newUser = await this.dbService.users.create({ data: { public_key: public_key } });
        return { public_key: newUser.public_key};
      }
      // Proposalları getirme
      async getProposal(public_Key :string,joinOrg: any) {
      const  public_key_ama_ne_guzel =  "AZ5NT2M9x9zD3HFMRJwfjwwawkMeJoKtgE1UMMkJNVm2" 
       
        const user = await this.dbService.users.findUnique({ where: { public_key: public_key_ama_ne_guzel } });
        console.log(user);
        console.log("deneme\n");
        const orgs = await this.dbService.user_organization.findMany({ where: { user_id: user.id }, select: { organization_id: true } });
        
        const proposals = [];
        
        for (const element of orgs) {
            const proposalsForOrg = await this.dbService.proposals.findMany({ where: { organization_id: element.organization_id }, select : { proposal_uuid: true, title: true, description: true, organization_id: false } });
            proposals.push(...proposalsForOrg);
        }
        
        console.log(proposals);
        Logger.log(proposals);
        return proposals;
    }
    //Organizasyona katılma
    async joinOrganization(pubkey : string, joinOrg: any) {
        const user = await this.dbService.users.findUnique({ where: { public_key: pubkey } });
        const org = await this.dbService.organizations.findUnique({ where: { public_key: joinOrg.public_key } });
        const org_user = await this.dbService.user_organization.create({ data: { user_id: user.id, organization_id: org.id } });
        Logger.log(org.public_key,org.name)
        return {message : {publicKey : org.public_key, org_title : org.name},
      }
      
    
    }
    async sso(mail: any) {
      const walletservice = new WalletService(this.dbService);
      const  {email}  = mail;
      console.log(email + " gmail adresi budur");
      console.log(mail)
      const deneme = await this.dbService.users.findUnique({ where: {gmail : email} });
      if(deneme == null) {
        
       return walletservice.createWallet(email);
      }
      return {message : deneme.public_key + "public keyi ile zaten kayıtlı bi gmail adresi"};
}
}
