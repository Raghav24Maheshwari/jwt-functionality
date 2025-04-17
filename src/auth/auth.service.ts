import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { SignupDto } from "./dto/signup.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { notifyEmail, welcomeEmail } from "src/utils/helper";
import { Role } from "src/common/enum";
import { NOTFOUND } from "dns";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already in use');

    const hash = await bcrypt.hash(dto.password, 10);
    const admin = await this.userRepo.findOne({where :{role:Role.ADMIN}})
    if (!admin || !admin.email) throw new Error('Admin not found or missing email');
    const user = this.userRepo.create({
      ...dto,
      password: hash,
    });
    await this.userRepo.save(user);
    await welcomeEmail(user.email,user.userName);
    await notifyEmail(admin?.email,user.email,user.userName,user.userId,user.role);

    return {
      message: 'User created successfully',
      user: {
        id: user.userId,
        email: user.email,
        username: user.userName,
        role: user.role,
      },
    };
    
  }

  async signin(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!user.isActive) {
      throw new BadRequestException('user not activated contact to admin');
    }
    if (user.isDeleted) {
      throw new NotFoundException('user is deleted contact to admin');
    }

    const payload = { sub: user.userId, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.userId,
        userName:user.userName,
        email: user.email,
        role: user.role,
        isActive:user.isActive,
        isDeleted:user.isDeleted,
        createdAt:user.createdAt
      },
    }; 
  }
}
