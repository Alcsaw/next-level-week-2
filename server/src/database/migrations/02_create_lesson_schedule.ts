import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('lessons_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        
        table.integer('lesson_id')
            .notNullable()
            .references('id')
            .inTable('lessons')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('lessons_schedule');
};
