import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "./app/app.module";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "../entities/order.entity";
import { DataSeedingService } from "src/services/data-seeding.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "orders.db",
      entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Order]),
    AppModule,
    OrdersModule,
  ],
  providers: [DataSeedingService],
})
export class RootModule {}
