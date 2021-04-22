import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { UserService } from '@multivendor-fullstack/api/user';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@multivendor-fullstack/api/auth';
import { Roles } from '@multivendor-fullstack/api/auth';
import { UpdateUserDto } from '@multivendor-fullstack/dto';

@Controller('admin')
export class AdminController {

  constructor(
    private userService: UserService
  ) {}

  @Get('users')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  getAllUsers() : Promise<SimpleUser[]> {
    return this.userService.findAll();
  }

  @Patch('users/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) : Promise<SimpleUser> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
