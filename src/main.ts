import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RootModule } from "./modules/root.module";
import "reflect-metadata";
import dataSource from "./data-source";

async function bootstrap() {
  // Run migrations before starting the server
  await dataSource.initialize();
  await dataSource.runMigrations();

  const app = await NestFactory.create(RootModule);

  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Orders API")
    .setDescription("API to manage orders")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = 3000;
  await app.listen(port);
  console.log(`Server has been started on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
