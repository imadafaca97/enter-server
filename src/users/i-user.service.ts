import { Users } from "@prisma/client";

export interface IUsersService {
     addUser(dto : Users): Promise<Users>;
     getAll(): Promise<Users[]>;
     getByEmail(email:string): Promise<Partial<Users>>;
     getById(uid : string): Promise<Partial<Users>>;
}