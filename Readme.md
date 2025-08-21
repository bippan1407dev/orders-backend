# Orders Backend

## Getting Started

### Prerequisites
- Node.js (v20 or later)
- Yarn (v1.22 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

---

## Development

### Start the Development Server
To start the development server with hot-reloading:
```bash
yarn start:dev
```
For api documentation
```
Swagger docs available at http://localhost:3000/api/docs
```

---

## Testing

### Find Code Coverage
To generate and view code coverage:
```bash
yarn test:coverage
```

---

## Build

### Build the Application
To build the application for production:
```bash
yarn build
```

---

## Production

### Start the Application
To start the application in production mode:
```bash
yarn start
```

---

## Additional Scripts

- **Clean Build Artifacts**:
  ```bash
  yarn clean
  ```
  Removes the `dist` directory and other build artifacts.


## Tools Used to create project
- Github Copilot with GPT-4o Model

## Prompts
- Create nest.js application
- use sqlite db, use following json keys to create orders table column.
- add data seeding to orders table add following values
    ```
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
    }
    ```
-  Add data seeding to Data-seeding.service.ts and always seed data on application start if no data exists.
-  Add Controller for orders to fetch orders, use typeorm add orders controller at /controller/orders/order.controller.ts, create /services/orders/order.service.ts
-  Add patch endpoint in Orders controller to update order in case of Pending order.
-  Add get enpoint to reset orders and set orders to initial state.
    ```
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
    }
    ```
- Add swagger for api documentation (multiple iterations)
- Add setup for test cases using jest (multiple iterations)
- Add test cases for controllers and services
