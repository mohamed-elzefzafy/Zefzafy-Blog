import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../auth/dtos/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '../auth/dtos/register.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { defaultProfileImage } from 'src/common/constants';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
   @InjectRepository(UserEntity) private readonly userRepositry: Repository<UserEntity>,
   private readonly cloudinaryService : CloudinaryService

  ){}

  

  public async findAll() {
    return this.userRepositry.find();
  }

  public async findOne(id: number) {
    const user = await this.userRepositry.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`User with id (${id}) not found`);
    }
    return user;
  }

  public async remove(id: number) {
   const user = await this.findOne(id);
if (user.profileImage.public_id !== null) {
  await this.cloudinaryService.removeImage(user.profileImage.public_id);
}
  await this.userRepositry.remove(user);
   return {message : `User with id (${id}) was removed`}
  }
}
