const { Model } = require('objection');

// models/BaseModel.js
class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}

export class Category extends BaseModel {
  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    // const Brand = require('./Brand');
    // const Addon = require('./Addon');
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'categories.brandId',

          to: 'brands.id',
        },
      },
      addons: {
        relation: Model.ManyToManyRelation,
        modelClass: Addon,
        join: {
          from: 'categories.id',
          through: {
            from: 'categories_addons.categoryId',
            to: 'categories_addons.addonId',
          },
          to: 'addons.id',
        },
      },
    };
  }
}

export class Brand extends BaseModel {
  static get tableName() {
    return 'brands';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    };
  }
  static get relationMappings() {
    // const Addon = require('./Addon');
    // const Category = require('./Category');
    return {
      addons: {
        relation: Model.HasManyRelation,
        modelClass: Addon,
        join: {
          from: 'brands.id',
          to: 'addons.brandId',
        },
      },
      categories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'brands.id',
          to: 'categories.brandId',
        },
      },
    };
  }
}

export class Addon extends BaseModel {
  static get tableName() {
    return 'addons';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        price: { type: 'integer' },
        category: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    // const Category = require('./Category');
    // const Brand = require('./Brand');
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'addons.brandId',
          to: 'brands.id',
        },
      },
      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'addons.id',
          through: {
            from: 'categories_addons.addonId',
            to: 'categories_addons.categoryId',
          },
          to: 'categories.id',
        },
      },
    };
  }
}
