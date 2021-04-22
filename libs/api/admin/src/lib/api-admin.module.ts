import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { UserModule } from '@multivendor-fullstack/api/user';

@Module({
  controllers: [AdminController],
  providers: [],
  exports: [],
  imports: [UserModule]
})
export class ApiAdminModule {}
