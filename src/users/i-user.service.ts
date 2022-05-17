import { Users } from "@prisma/client";

export interface IUsersService {
     addUser(dto : Users): Promise<Users>;
     getAll(): Promise<Users[]>;
     getByEmail(email:string): Promise<Partial<Users>>;
     getById(id : string): Promise<Partial<Users>>;
     filterUsers(dto :Users) : Promise<Users[]>;
     editUser(dto : Users) : Promise<Users>;
     disableUser(dto: Users) : Promise<Users>;

}