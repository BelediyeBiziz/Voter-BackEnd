import { Injectable } from '@nestjs/common';
import { dbService } from '../db-service/db-service.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class WebService {
    constructor(private dbService: dbService) {}
    async createProposal(pubKey : string,proposal: any) {
        const org = await this.dbService.organizations.findUnique({ where: { public_key: pubKey } });
        const newProposal = await this.dbService.proposals.create({ data: { title: proposal.title, description: proposal.description, organization_id: org.id} });
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
}
