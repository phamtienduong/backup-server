import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/create")
  async createProduct(@Body() body: CreateProductDto) {
    const {images, ...data} = body

    const result: any = await this.productsService.createProduct(body)as any;
    if (result?.status === 1) {
      console.log(result);
      
      const newData = images.filter(item => item != "")
      const resultImges = await this.productsService.createImages(newData, result.data.raw.insertId)
    }
    
    return "thanh cong"
    
  }

  @Get("get-list")
  getAll() {
    return this.productsService.getAll();
  }

  @Patch('/update/:id')
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  async updateProducts(@Body() body: UpdateProductDto, @Param() param: string) {
    // console.log("body",body);
    // console.log("param",param);
    
    return await this.productsService.updateProducts(body, param);
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', description: 'Product ID' })
  async deleteProduct(@Param() param: string) {

    await this.productsService.deleteImages(param)

    return await this.productsService.deleteProduct(param);
  }

  @Put('update-impds')
  async updateImpds(@Body() body:any) {
      console.log(body );
      
    await this.productsService.updateImage(body)

    return "update impd oke"
  }
}
