import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { dbService } from './db-service/db-service.service';
import { NotFoundError } from 'rxjs';
export interface agladim {
  orgId :number,
}
@Injectable()


export class AppService {


  constructor(private readonly dbService: dbService) {}
  getHello(): string {
    throw new ForbiddenException()
    return 'Hello World!';
  }


//   async createUser(user: any) {

//     const {public_key} = user;
//     if(await this.dbService.users.findUnique({ where: { public_key: public_key } })) {
//       return {message : "User already exists"};
//     }
//     const newUser = await this.dbService.users.create({ data: { public_key: public_key } });
//     return { public_key: newUser.public_key};
//   }
//   async getuserfromorg() {
//     const user = await this.dbService.users.findMany();
//     const org = await this.dbService.organizations.findMany();
//     const org_user = await this.dbService.user_organization.findMany();
//     const proposal = await this.dbService.proposals.findMany();
//     return  {user, org, org_user, proposal};

//   }
//   async getProposal(public_Key :string,joinOrg: any) {
//     const deneme = "AZ5NT2M9x9zD3HFMRJwfjwwawkMeJoKtgE1UMMkJNVm2"
//     const user = await this.dbService.users.findUnique({ where: { public_key: deneme } });
//     console.log(user);
//     console.log("deneme\n");
//     const orgs = await this.dbService.user_organization.findMany({ where: { user_id: user.id }, select: { organization_id: true } });
//     console.log(orgs);
//     console.log("deneme\n");

//     const proposals = [];

//     for (const element of orgs) {
//         const proposalsForOrg = await this.dbService.proposals.findMany({ where: { organization_id: element.organization_id }, select : { proposal_uuid: true, title: true, description: true, organization_id: false } });
//         proposals.push(...proposalsForOrg);
//     }

//     console.log(proposals);
//     return proposals;
// }

//   async createProposal(pubKey : string,proposal: any) {
//     const org = await this.dbService.organizations.findUnique({ where: { public_key: pubKey } });
//     const newProposal = await this.dbService.proposals.create({ data: { title: proposal.title, description: proposal.description, organization_id: org.id} });
//     return newProposal;
//   }

//   async checkOrganization(pubkey : string) {
    
//     console.log(pubkey)
//     const org = await this.dbService.organizations.findUnique({ where: { public_key: pubkey } });
//     if(org == null) {
//     throw new NotFoundError("Organization not found");
//     }
//     return {message : {publicKey : org.public_key, organizationName : org.name}};
//   }

//   async createOrganization(organization: any) {
//     const newOrganization = await this.dbService.organizations.create({ data: { name: organization.name, public_key: organization.public_key } });
//     return { public_key: newOrganization.public_key , org_title: newOrganization.name };
//   }
//   async joinOrganization(pubkey : string, joinOrg: any) {
//     const user = await this.dbService.users.findUnique({ where: { public_key: pubkey } });
//     const org = await this.dbService.organizations.findUnique({ where: { public_key: joinOrg.public_key } });
//     const org_user = await this.dbService.user_organization.create({ data: { user_id: user.id, organization_id: org.id } });
//     return {message : {publicKey : org.public_key, org_title : org.name},
//   }
//}
}
