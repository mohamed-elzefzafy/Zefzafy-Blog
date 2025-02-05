import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../auth/dtos/update-user.dto';
import { Roles } from 'src/auth/decorator/Roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRoles } from 'src/common/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get()
  @Roles([UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
