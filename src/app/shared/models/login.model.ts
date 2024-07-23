import { User } from './user.model';


export class LoginResponse{
    user!: User| null;
    token!: string| null;
    roleValue!: number;

}

export class LoginRequest{
  email!: string| null;
  password!: string| null;

}

export class RegistrationRequest{
  firstName!: string | null;
  lastName!: string| null;
  email!:string| null;
  password!:string| null;

}


