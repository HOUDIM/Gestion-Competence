export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignupRequest {
  name?: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  role: 'ROLE_ADMNI' | 'ROLE_USER' | 'ROLE_RH';
}
