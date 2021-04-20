import { UserResponse } from './user';

export interface CreateRefreshTokenResponse {

}

export interface AuthenticationPayload {
	user: UserResponse
	jwt: {
		token: string
		refresh?: string
	}
}


export interface AuthenticationResponse {
  success: boolean;
  data: AuthenticationPayload
}
