import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.MONGODB_HOST,
  port: parseInt(process.env.MONGODB_PORT, 10),
  database: process.env.MONGODB_DATABASE,
}));
