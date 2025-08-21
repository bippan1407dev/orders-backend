import { Test, TestingModule } from "@nestjs/testing";
import { OrdersController } from "./orders.controller";
import { HttpException, HttpStatus } from "@nestjs/common";
import { OrdersService } from "../../services/orders/orders.service";

describe("OrdersController", () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            getOrders: jest.fn().mockReturnValue([
              {
                orderNumber: "1001",
                orderTotal: "$250.00",
                orderStatus: "Pending",
                orderDate: "2023-10-01",
              },
            ]),
            updateOrderStatus: jest
              .fn()
              .mockImplementation((orderNumber, newStatus) => {
                if (newStatus !== "Pending") {
                  return { orderNumber, orderStatus: newStatus };
                }
                throw new HttpException(
                  "Invalid status",
                  HttpStatus.BAD_REQUEST
                );
              }),
            resetOrders: jest.fn().mockReturnValue("Orders reset successfully"),
          },
        },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  describe("getOrders", () => {
    it("should return an array of orders", () => {
      expect(ordersController.getOrders()).toEqual([
        {
          orderNumber: "1001",
          orderTotal: "$250.00",
          orderStatus: "Pending",
          orderDate: "2023-10-01",
        },
      ]);
    });
  });

  describe("updateOrderStatus", () => {
    it("should update the order status", async () => {
      const result = await ordersController.updateOrderStatus(
        "1001",
        "Shipped"
      );
      expect(result).toEqual({ orderNumber: "1001", orderStatus: "Shipped" });
    });

    it("should throw an error for invalid status", async () => {
      await expect(
        ordersController.updateOrderStatus("1001", "Pending")
      ).rejects.toThrow(HttpException);
    });

    it("should throw an error if the order is not found", async () => {
      jest.spyOn(ordersService, "updateOrderStatus").mockImplementation(() => {
        throw new HttpException("Order not found", HttpStatus.NOT_FOUND);
      });

      await expect(
        ordersController.updateOrderStatus("9999", "Shipped")
      ).rejects.toThrow(HttpException);
    });
  });

  describe("resetOrders", () => {
    it("should reset orders", async () => {
      const result = await ordersController.resetOrders();
      expect(result).toBe("Orders reset successfully");
    });
  });
});
