import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersController } from "../../controllers/orders/orders.controller";
import { OrdersService } from "../../services/orders/orders.service";
import { Order } from "../../entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
