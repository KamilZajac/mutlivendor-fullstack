import { SimpleUser } from './user';

export interface CreateRefreshTokenResponse {

}

export interface AuthenticationPayload {
	user: SimpleUser
	jwt: {
		token: string
		refresh?: string
	}
}


export interface AuthenticationResponse {
  success: boolean;
  data: AuthenticationPayload
}
