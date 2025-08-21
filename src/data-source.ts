import { DataSource } from "typeorm";
import * as path from "path";

const dataSource = new DataSource({
  type: "sqlite",
  database: "orders.db",
  entities: [path.join(__dirname, "./**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "./migrations/*{.ts,.js}")],
  synchronize: false,
});

export default dataSource;
