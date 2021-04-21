export interface UserResponse {
	email: string;
	username: string;
	id: string;
	role: string;
}

export enum UserRole {
  USER = 'user',
  SELLER = 'seller',
  ADMIN = 'admin'
}
