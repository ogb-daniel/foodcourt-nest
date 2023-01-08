import { Injectable, ForbiddenException } from '@nestjs/common';
import { raw } from 'objection';
const { Brand, Category, Addon } = require('../models/Mod.js');
import { BrandAddonDto, BrandCatDto, BrandDto } from './dto';

@Injectable()
export class BrandService {
  async createBrand(dto: BrandDto) {
    const brand = await Brand.query().insert({
      name: dto.name,
    });
    return brand;
  }

  async createBrandAddOn(dto: BrandAddonDto, brandId) {
    const category = await Category.query().findOne({
      name: dto.category,
    });
    console.log(category);

    if (!category) {
      throw new ForbiddenException('Category does not exist');
    }
    const addon = await Addon.query().insertGraph(
      [
        {
          name: dto.name,
          description: dto.description,
          price: dto.price,
          category: dto.category,
          categories: [
            {
              id: category.id,
            },
          ],
          brands: [
            {
              id: brandId,
            },
          ],
        },
      ],
      { relate: true },
    );
    return addon;
  }
  async createBrandAddonCategory(dto: BrandCatDto, brandId) {
    const category = await Category.query().findOne({
      name: dto.name,
    });
    if (category) {
      throw new ForbiddenException('Category already exists');
    }
    const brandCat = await Category.query().insertGraph(
      [
        {
          name: dto.name,
          brands: [
            {
              id: brandId,
            },
          ],
        },
      ],
      {
        relate: true,
      },
    );
    return brandCat;
  }

  async listBrandAddOns(brandId) {
    const addOns = await Brand.relatedQuery('addons').for(brandId);
    return addOns;
  }
  async listBrandAddOn(brandId, addonId) {
    const addOn = await Brand.relatedQuery('addons')
      .for(brandId)
      .where('id', addonId);
    return addOn;
  }

  async updateBrandAddOn(brandId, addonId, dto: BrandAddonDto) {
    let category;
    if (dto.category) {
      category = await Category.query().findOne({
        name: dto.category,
      });
      if (!category) {
        throw new ForbiddenException('Category does not exist');
      }
    }

    let updatedAddon = {
      name: dto.name,
      description: dto.description,
      price: dto.price,
      category: dto.category,
    };

    if (!dto.name) {
      delete updatedAddon.name;
    }

    if (!dto.description) {
      delete updatedAddon.description;
    }

    if (!dto.price) {
      delete updatedAddon.price;
    }

    if (!dto.category) {
      delete updatedAddon.category;
    }

    const addOn = await Addon.query().findById(addonId).patch(updatedAddon);
    return addOn;
  }
  async deleteBrandAddOn(brandId, addonId) {
    const addOn = await Brand.relatedQuery('addons')
      .for(brandId)
      .delete()
      .where('id', addonId);
    return addOn;
  }
}
