import { UserResponse } from './user';

export interface CreateRefreshTokenResponse {

}

export interface AuthenticationPayload {
	user: UserResponse
	payload: {
		type: string
		token: string
		refresh_token?: string
	}
}
