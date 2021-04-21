import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, RolesGuard } from '@multivendor-fullstack/api/auth';
import { ShopItemModule } from '@multivendor-fullstack/api/shop-item';
import { UserModule } from '@multivendor-fullstack/api/user';
import { ApiAdminModule } from '@multivendor-fullstack/api/admin';
import { APP_GUARD } from '@nestjs/core';

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
    AuthModule,
    ApiAdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
