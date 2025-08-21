import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { OrdersService } from "../../services/orders/orders.service";

@ApiTags("orders")
@Controller("api/orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Patch(":orderNumber")
  @ApiParam({ name: "orderNumber", description: "The order number to update" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        newStatus: {
          type: "string",
          description:
            "The new status for the order (e.g., Shipped, Cancelled)",
        },
      },
      required: ["newStatus"],
    },
  })
  async updateOrderStatus(
    @Param("orderNumber") orderNumber: string,
    @Body("newStatus") newStatus: string
  ) {
    try {
      return await this.ordersService.updateOrderStatus(orderNumber, newStatus);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("reset")
  async resetOrders() {
    return this.ordersService.resetOrders();
  }
}
