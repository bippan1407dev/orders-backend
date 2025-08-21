import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderNumber TEXT NOT NULL,
        orderTotal TEXT NOT NULL,
        orderStatus TEXT NOT NULL,
        orderDate TEXT NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE orders");
  }
}
