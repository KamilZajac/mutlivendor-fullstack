import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { SimpleUser } from '@multivendor-fullstack/interfaces';

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

}
