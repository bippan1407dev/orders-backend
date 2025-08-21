import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderNumber!: string;

  @Column()
  orderTotal!: string;

  @Column()
  orderStatus!: string;

  @Column()
  orderDate!: string;
}
