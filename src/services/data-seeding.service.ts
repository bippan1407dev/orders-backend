import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class DataSeedingService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async onApplicationBootstrap() {
    const count = await this.orderRepository.count();
    if (count === 0) {
      await this.seedOrders();
    }
  }

  private async seedOrders() {
    await this.orderRepository.save([
      {
        orderNumber: "1001",
        orderTotal: "$250.00",
        orderStatus: "Pending",
        orderDate: "2023-10-01",
      },
      {
        orderNumber: "1002",
        orderTotal: "$150.00",
        orderStatus: "Shipped",
        orderDate: "2023-09-28",
      },
      {
        orderNumber: "1003",
        orderTotal: "$300.00",
        orderStatus: "Cancelled",
        orderDate: "2023-09-25",
      },
    ]);
  }
}
