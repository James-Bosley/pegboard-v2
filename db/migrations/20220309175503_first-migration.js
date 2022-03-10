/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("clubs", (table) => {
    table.increments("id").primary().notNullable();
    table.string("name").notNullable();
    table.string("address_1").notNullable();
    table.string("address_2");
    table.string("town").notNullable();
    table.string("county");
    table.string("postcode").notNullable();
    table.string("phone_number");
    table.string("email_address").unique().notNullable();
    table.string("web_url");
    table.integer("number_of_courts").notNullable();
    table.datetime("member_since").notNullable();
    table.text("extra_info");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("clubs");
};
