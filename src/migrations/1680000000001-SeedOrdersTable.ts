import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedOrdersTable1680000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO orders (orderNumber, orderTotal, orderStatus, orderDate) VALUES
      ('1001', '$250.00', 'Pending', '2023-10-01'),
      ('1002', '$150.00', 'Shipped', '2023-09-28'),
      ('1003', '$300.00', 'Cancelled', '2023-09-25');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM orders");
  }
}
