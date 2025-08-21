import { Test, TestingModule } from "@nestjs/testing";
import { OrdersModule } from "./orders.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "../../controllers/orders/orders.controller";
import { Order } from "../../entities/order.entity";
import { OrdersService } from "../../services/orders/orders.service";
import { DataSource } from "typeorm";

// Updated test setup to include in-memory database configuration

describe("OrdersModule", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [Order],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Order]),
        OrdersModule,
      ],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();
  });

  it("should be defined", () => {
    const ordersModule = module.get<OrdersModule>(OrdersModule);
    expect(ordersModule).toBeDefined();
  });
});
