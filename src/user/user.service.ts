import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import {  User } from "./entities/user.entity";
import { Role } from "src/common/enum";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

   constructor(
      // private jwtService: JwtService,
      @InjectRepository(User)
      private userRepo: Repository<User>
    ) {}

  async findAll() {
    const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return `This action returns all user`;
  }

  async findOne(id: number):Promise<User>  {
    const user = await this.userRepo.findOne({
      where:{id}
    })
    if(!user) throw new BadRequestException({message:'user not found'});
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if(!user) throw new BadRequestException({message:'user not found'});
    await this.userRepo.update(id, { isDeleted: true });
    return await this.userRepo.softDelete(id)
    
  }
}
