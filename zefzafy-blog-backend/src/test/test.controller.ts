import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  create(@Body() createTestDto: CreateTestDto , @UploadedFiles() files : Express.Multer.File[]) {
    return this.testService.create(createTestDto , files);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id' , ParseIntPipe) id: number) {
    return this.testService.remove(id);
  }
}
