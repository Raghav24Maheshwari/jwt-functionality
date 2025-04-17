import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { ListOpts } from "src/utils/interfaces";

@Injectable()
export class UserService {

   constructor(
      // private jwtService: JwtService,
      @InjectRepository(User)
      private userRepo: Repository<User>
    ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(userId: number):Promise<User>  {
    const user = await this.userRepo.findOne({
      where:{userId}
    })
    if(!user) throw new BadRequestException({message:'user not found'});
    return user
  }

  async remove(userId: number) {
    const user = await this.userRepo.findOne({
      where:{userId}
    })
    if(!user) throw new BadRequestException({message:'user not found'});
    await this.userRepo.update(userId, { isDeleted: true });
    return await this.userRepo.softDelete(userId)
    
  }


  async activateUser(userId: number) {
    const user = await this.userRepo.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('User not found');
    user.isActive = true;
    return this.userRepo.save(user);
  }

  async findAllOtps(opts: ListOpts) {
    const { page, limit, status } = opts;
    const where: any = { isDeleted: false };
    if (status === 'active')   where.isActive = true;
    if (status === 'inactive') where.isActive = false;

    const [data, total] = await this.userRepo.findAndCount({
      where,
      skip : (page-1)*limit,
      take : limit,
      order: { createdAt: 'DESC' },
    });

    return { page, limit, total, data };
  }


  findDeleted() {
    return this.userRepo.find({ where: { isDeleted: true } });
  }
}
