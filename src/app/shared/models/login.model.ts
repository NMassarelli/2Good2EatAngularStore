import { User } from './user.model';


export class LoginResponse{
    user!: User;
    access_token!: string;

}

export class LoginRequest{
  email!: string;
  password!: string;

}

export class RegistrationRequest{
  firstName!: string | null;
  lastName!: string| null;
  email!:string| null;
  password!:string| null;

}


