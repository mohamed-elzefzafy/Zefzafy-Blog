import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/auth/decorator/Roles.decorator';
import { UserRoles } from 'src/common/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PAGE_LIMIT } from 'src/common/constants';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles([UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = `${PAGE_LIMIT}`,
  ) {
    return this.categoryService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles([UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles([UserRoles.ADMIN])
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }

  // @Get('getCategoriesCount')
  // @Roles([UserRoles.ADMIN])
  // getPostsCount() {
  //   return this.categoryService.getCategoriesCount();
  // }
}
