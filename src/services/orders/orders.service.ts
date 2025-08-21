import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../../entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async getOrders() {
    return this.orderRepository.find();
  }

  async updateOrderStatus(orderNumber: string, newStatus: string) {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
    });
    if (order && order.orderStatus === "Pending") {
      order.orderStatus = newStatus;
      return this.orderRepository.save(order);
    }
    throw new Error("Order not found or status is not Pending");
  }

  async resetOrders() {
    await this.orderRepository.clear();
    await this.seedOrders();
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
