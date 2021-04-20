import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@multivendor-fullstack/api/auth';
import { ShopItemModule } from '@multivendor-fullstack/api/shop-item';
import { UserModule } from '@multivendor-fullstack/api/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DATABASE_HOST,
      "port": +process.env.DATABASE_PORT,
      "username": process.env.DATABASE_USER,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "entities": getMetadataArgsStorage().tables.map(tbl => tbl.target),
      "logging": true,
      "bigNumberStrings": false,
      "synchronize": true
    }),
    ConfigModule.forRoot(),
    UserModule,
    ShopItemModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
