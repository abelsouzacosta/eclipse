import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(SeederService);
  await seeder.seed();
  await app.close();
  await app.listen(3000);
}
bootstrap();
