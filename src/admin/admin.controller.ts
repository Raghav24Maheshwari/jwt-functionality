import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Role } from "src/common/enum";
import { Roles } from "src/utils/decorators/roles.decorator";
import { ADMIN_MESSAGES } from "src/utils/constants";

@ApiTags("Admin")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("users/:id/_activate")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ADMIN_MESSAGES.ACTIVATE_USER_SUMMARY })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: ADMIN_MESSAGES.ACTIVATE_USER_SUCCESS,
  })
  @ApiResponse({
    status: 404,
    description: ADMIN_MESSAGES.ACTIVATE_USER_NOT_FOUND,
  })
  activateUser(@Param("id") id: string) {
    return this.adminService.activateUser(+id);
  }

  @Get("users")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ADMIN_MESSAGES.LIST_USERS_SUMMARY })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  listUsers(@Query("page") page = "1", @Query("limit") limit = "10") {
    return this.adminService.listUsers(+page, +limit);
  }

  @Get("users/deleted")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ADMIN_MESSAGES.LIST_DELETED_USERS_SUMMARY })
  listDeletedUsers() {
    return this.adminService.listDeleted();
  }

  @Get("otps")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: ADMIN_MESSAGES.LIST_OTPS_SUMMARY })
  listOtps() {
    return this.adminService.listOtps();
  }
}
