import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { UserResponse } from '@multivendor-fullstack/interfaces';
import { CreateUserDto, UpdateUserDto } from '@multivendor-fullstack/dto';

@Injectable()
export class UserService {

	filter(user: User): UserResponse {
		const { email, id, username } = user;
		return { email, id, username };
	}

	async validateCredentials (user: User, password: string): Promise<boolean> {
		return compare(password, user.password)
	}

	async create(createUserDto: CreateUserDto): Promise<UserResponse> {
		const newUser = new User();

		const existingFromUsername = await this.findByUserName(createUserDto.username)

		if (existingFromUsername) {
			throw new UnprocessableEntityException('Username already in use')
		}

		const saltRounds = 10;

		const hashedPWD = await hash(createUserDto.password, saltRounds)
		console.log(hashedPWD)

		newUser.email = createUserDto.email;
		newUser.password = hashedPWD;
		newUser.username = createUserDto.username

		await newUser.save();

		return this.filter(newUser);
	}

	findAll() {
		return `This action returns all user`;
	}

	async findById(id: number): Promise<UserResponse> {
		const user = await User.findOneOrFail(id);
		return this.filter(user);
	}

	async findByUserName(username: string): Promise<User> {
		return await User.findOne({
			where: {
				username
			}
		});
		// return user;
	}


	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
