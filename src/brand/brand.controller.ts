import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandAddonDto, BrandCatDto, BrandDto } from './dto';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}
  @Post()
  createBrand(@Body() dto: BrandDto) {
    return this.brandService.createBrand(dto);
  }

  @Post(':brandId/addons')
  createBrandAddOn(@Param() params, @Body() dto: BrandAddonDto) {
    return this.brandService.createBrandAddOn(dto, params.brandId);
  }

  @Get(':brandId/addons')
  listBrandAddOns(@Param() params) {
    return this.brandService.listBrandAddOns(params.brandId);
  }

  @Get(':brandId/addons/:addonId')
  listBrandAddOn(@Param() params) {
    return this.brandService.listBrandAddOn(params.brandId, params.addonId);
  }

  @Patch(':brandId/addons/:addonId')
  updateBrandAddOn(@Param() params, @Body() dto: BrandAddonDto) {
    return this.brandService.updateBrandAddOn(
      params.brandId,
      params.addonId,
      dto,
    );
  }

  @Delete(':brandId/addons/:addonId')
  deleteBrandAddOn(@Param() params) {
    return this.brandService.deleteBrandAddOn(params.brandId,params.addonId);
  }

  @Post(':brandId/addon-categories')
  createBrandAddOnCategory(@Param() params, @Body() dto: BrandCatDto) {
    return this.brandService.createBrandAddonCategory(dto, params.brandId);
  }
}
