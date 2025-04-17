import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { NOT_FOUND, SOFT_DELETED, UNAUTHORIZED, USER_MESSAGES } from "src/utils/constants";
import { User } from "./entities/user.entity";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/utils/decorators/roles.decorator";
import { Role } from "src/common/enum";

@ApiTags("USER")
@ApiBearerAuth()
@ApiExtraModels(User)               
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: USER_MESSAGES.LIST_USERS })
  @ApiResponse({ status: 200, description: USER_MESSAGES.LIST_USERS })
  @ApiResponse({ status: 401, description: UNAUTHORIZED })
  @ApiForbiddenResponse({ description: 'Admin role required' })
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }


  @ApiOperation({ summary: USER_MESSAGES.LIST_USERS_ID })
  @ApiResponse({ status: 200, description: USER_MESSAGES.LIST_USERS })
  @ApiResponse({ status: 400, description: USER_MESSAGES.USER_ID_REQUIRED })
  @ApiResponse({ status: 401, description: UNAUTHORIZED })
  @ApiResponse({ status: 400, description: NOT_FOUND })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Get('deleted')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: SOFT_DELETED })
  @ApiForbiddenResponse({ description: 'Admin role required' })
  getDeletedUsers() {
    return this.userService.findDeleted();
  }

  @Delete('delete')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: USER_MESSAGES.DELETE_USER })
  @ApiResponse({ status: 401, description: UNAUTHORIZED })
  @ApiResponse({ status: 400, description: NOT_FOUND })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
