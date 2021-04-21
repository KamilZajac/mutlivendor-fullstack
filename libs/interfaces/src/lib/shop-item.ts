import { UserResponse } from './user';

export class ShopItemResponse {
	createdAt: Date;
	description: string;
	id: string;
	name: string;
	price: number;
	status: string;
	updatedAt: Date;
	validUntil: Date;
	owner: UserResponse
}
export enum ShopItemStatus {
  pending = 'pending',
  active = 'active',
  expired = 'expired',
  closed = 'closed'
}
