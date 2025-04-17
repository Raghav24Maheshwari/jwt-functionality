


import { Injectable } from '@nestjs/common';
import { OtpService }  from 'src/otp/otp.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(private users: UserService, private otps: OtpService) {}

  activateUser(id: number) 
  { return this.users.activateUser(id); }
  listUsers(pages:number,limit:number) 
   { return this.users.findAllOtps({ page:pages, limit }); }
  listDeleted()             
     { return this.users.findDeleted(); }
  listOtps()          
           { return this.otps.findAll(); }
}