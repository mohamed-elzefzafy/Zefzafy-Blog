import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity) private readonly testRepositry : Repository<TestEntity> ,
    private readonly cloudinaryService : CloudinaryService,
  ) { }
  public async create(createTestDto: CreateTestDto , files : Express.Multer.File[]) {

    let resultImages =[];
    for (let file of files) {
     const { secure_url , public_id } = await this.cloudinaryService.uploadImage(file , "tests");
     resultImages.push({
      url : secure_url,
       public_id,
     })

    }

   const test  = this.testRepositry.create({...createTestDto , images : resultImages});

    
    return this.testRepositry.save(test);
  }

  public async findAll() {
    return this.testRepositry.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  public async remove(id: number) {
  const test = await this.testRepositry.findOneBy({id});
  if (!test) throw new NotFoundException("test not found");
  if (test.images.length > 0) {
    await this.cloudinaryService.removeMultipleImages(test.images.map(image => image.public_id));
  }
  await this.testRepositry.remove(test);
  return {message : "test deleted succefully"};
  }
}
