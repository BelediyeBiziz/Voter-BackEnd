import { Injectable } from '@nestjs/common';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';
import { dbService } from 'src/db-service/db-service.service';
@Injectable()
export class WalletService {
    
    private connection: Connection;
    constructor(private readonly dbService: dbService) {
        // Solana ana ağı ile bağlantı kuruyoruz
        this.connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');



    }
        public async createWallet(gmail: string): Promise<any>{
        const a = await this.dbService.users.findUnique({where : {gmail : gmail}});
        
        if(a != null) {
        return {message : "Kullanıcı zaten var"};
        }
        else{

            // Yeni bir cüzdan oluşturuyoruz
            const wallet = new Keypair();
            // Cüzdanın public key'ini alıyoruz
            const publicKey = wallet.publicKey;
            // Cüzdanın private key'ini alıyoruz
            const privateKey = wallet.secretKey.toString();
            // Cüzdanın public key'ini yazdırıyoruz
            console.log('Public Key: ', publicKey);
            // Cüzdanın private key'ini yazdırıyoruz
            console.log('Private Key: ', privateKey);
            
            // Cüzdanı veritabanına kaydediyoruz
            const newUser = await this.dbService.users.create({ data: { gmail: gmail, public_key: publicKey.toBase58(),private_key: privateKey} });
            return { public_key: newUser.public_key};
            
        }

     
    }
  }

