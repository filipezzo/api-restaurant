import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex<ProductRepo>("products").insert([
    { name: "lasanha", price: 120 },
    { name: "carbonara", price: 90 },
    { name: "gnocchi", price: 80 },
    { name: "risoto de cogumelos", price: 110 },
    { name: "pizza margherita", price: 100 },
    { name: "fettuccine alfredo", price: 95 },
    { name: "ravioli de ricota", price: 85 },
    { name: "polenta cremosa", price: 70 },
    { name: "ossobuco", price: 150 },
    { name: "tiramisu", price: 60 },
    { name: "panna cotta", price: 50 },
    { name: "bruschetta", price: 45 },
  ]);
}
