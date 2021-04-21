import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UserResponse } from '@multivendor-fullstack/interfaces';
import { RegisterDto, UpdateUserDto } from '@multivendor-fullstack/dto';
import { User } from '@multivendor-fullstack/entities';

@Injectable()
export class UserService {

  filterUser(user: User): UserResponse {
    const { email, id, username, role } = user;
    return { email, id, username, role };
  }

	async validateCredentials (user: User, password: string): Promise<boolean> {
		return compare(password, user.password)
	}

	async create(createUserDto: RegisterDto): Promise<User> {
		const newUser = new User();

		const existingFromUsername = await this.findByUserName(createUserDto.username)

		if (existingFromUsername) {
			throw new UnprocessableEntityException('Username already in use')
		}

		const saltRounds = 10;

		const hashedPWD = await hash(createUserDto.password, saltRounds)

		newUser.email = createUserDto.email;
		newUser.password = hashedPWD;
		newUser.username = createUserDto.username

		await newUser.save();
		return newUser;
	}


	async findById(id: number): Promise<User> {
		return await User.findOneOrFail(id);
	}

	async findByUserName(username: string): Promise<User> {
	  return await User.findOne({
			where: {
				username
			}
		});
	}

	async findAll(): Promise<UserResponse[]> {
	  const users = await User.find();
	  return users.map(user => this.filterUser(user))
  }

}
