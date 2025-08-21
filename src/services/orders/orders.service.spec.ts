import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Order } from "../../entities/order.entity";

describe("OrdersService", () => {
  let ordersService: OrdersService;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  describe("getOrders", () => {
    it("should return an array of orders", async () => {
      const mockOrders = [
        {
          orderNumber: "1001",
          orderTotal: "$250.00",
          orderStatus: "Pending",
          orderDate: "2023-10-01",
        },
      ];
      jest
        .spyOn(orderRepository, "find")
        .mockResolvedValue(mockOrders as Order[]);

      const result = await ordersService.getOrders();
      expect(result).toEqual(mockOrders);
    });
  });

  describe("updateOrderStatus", () => {
    it("should update the order status if it is Pending", async () => {
      const mockOrder = {
        orderNumber: "1001",
        orderTotal: "$250.00",
        orderStatus: "Pending",
        orderDate: "2023-10-01",
      };
      jest
        .spyOn(orderRepository, "findOne")
        .mockResolvedValue(mockOrder as Order);
      jest.spyOn(orderRepository, "save").mockResolvedValue({
        ...mockOrder,
        orderStatus: "Shipped",
      } as Order);

      const result = await ordersService.updateOrderStatus("1001", "Shipped");
      expect(result).toEqual({ ...mockOrder, orderStatus: "Shipped" });
    });

    it("should throw an error if the order is not Pending", async () => {
      const mockOrder = {
        orderNumber: "1001",
        orderTotal: "$250.00",
        orderStatus: "Shipped",
        orderDate: "2023-10-01",
      };
      jest
        .spyOn(orderRepository, "findOne")
        .mockResolvedValue(mockOrder as Order);

      await expect(
        ordersService.updateOrderStatus("1001", "Cancelled")
      ).rejects.toThrow("Order not found or status is not Pending");
    });

    it("should throw an error if the order is not found", async () => {
      jest.spyOn(orderRepository, "findOne").mockResolvedValue(null);

      await expect(
        ordersService.updateOrderStatus("9999", "Shipped")
      ).rejects.toThrow("Order not found or status is not Pending");
    });
  });

  describe("resetOrders", () => {
    it("should clear and reseed the orders table", async () => {
      jest.spyOn(orderRepository, "clear").mockResolvedValue(undefined);
      jest.spyOn(orderRepository, "save").mockResolvedValue([
        {
          orderNumber: "1001",
          orderTotal: "$250.00",
          orderStatus: "Pending",
          orderDate: "2023-10-01",
        },
      ] as any);

      await ordersService.resetOrders();

      expect(orderRepository.clear).toHaveBeenCalled();
      expect(orderRepository.save).toHaveBeenCalled();
    });
  });
});
