import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('brands', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('addons', (table) => {
      table.increments('id').primary();
      table
        .integer('brandId')
        .unsigned()
        .references('id')
        .inTable('brands')
        .onDelete('SET NULL')
        .index();

      table.string('name');
      table.string('description');
      table.integer('price');
      table.string('category');
    })
    .createTable('categories', (table) => {
      table.increments('id').primary();
      table
        .integer('brandId')
        .unsigned()
        .references('id')
        .inTable('brands')
        .onDelete('SET NULL')
        .index();
      table.string('name');
    })
    .createTable('categories_addons', (table) => {
      table.increments('id').primary();
      table
        .integer('categoryId')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .index();
      table
        .integer('addonId')
        .unsigned()
        .references('id')
        .inTable('addons')
        .onDelete('CASCADE')
        .index();
    });
  // .createTable('brands_addons', (table) => {
  //   table.increments('id').primary();
  //   table
  //     .integer('brandId')
  //     .unsigned()
  //     .references('id')
  //     .inTable('brands')
  //     .onDelete('CASCADE')
  //     .index();

  //   table
  //     .integer('addonId')
  //     .unsigned()
  //     .references('id')
  //     .inTable('addons')
  //     .onDelete('CASCADE')
  //     .index();
  // })
  // .createTable('brands_categories', (table) => {
  //   table.increments('id').primary();
  //   table
  //     .integer('brandId')
  //     .unsigned()
  //     .references('id')
  //     .inTable('brands')
  //     .onDelete('CASCADE')
  //     .index();

  //   table
  //     .integer('categoryId')
  //     .unsigned()
  //     .references('id')
  //     .inTable('categories')
  //     .onDelete('CASCADE')
  //     .index();
  // });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('brands_categories')
    .dropTableIfExists('brands_addons')
    .dropTableIfExists('brands')
    .dropTableIfExists('categories')
    .dropTableIfExists('addons');
}
