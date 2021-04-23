import { Body, Controller, Delete, Get, Param, Patch, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { Roles, RolesGuard } from '@multivendor-fullstack/api/shared';
import { UpdateUserDto } from '@multivendor-fullstack/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(
    @Req() request
  ): SimpleUser {
    return this.userService.getMe(request)
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  getAllUsers() : Promise<SimpleUser[]> {
    return this.userService.findAll();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) : Promise<SimpleUser> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  deleteUser(
    @Param('id') id: string,
  ) : Promise<number> {
    return this.userService.deleteUser(id);
  }

}
