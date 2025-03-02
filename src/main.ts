import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware trước ValidationPipe
  app.use((req, res, next) => {
    if (req.body) console.log('Raw request body:', req.body);
    next();
  });

  // Thêm global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,       // Tắt whitelist để không lọc thuộc tính khi không cần thiết
      transform: true,        // Giữ transform để tự động chuyển đổi kiểu dữ liệu
      forbidNonWhitelisted: false, // Không báo lỗi với thuộc tính không mong đợi
      skipMissingProperties: true, // Bỏ qua các thuộc tính bị thiếu
      stopAtFirstError: true, // Dừng kiểm tra sau lỗi đầu tiên (tăng hiệu suất)
      enableDebugMessages: process.env.NODE_ENV !== 'production', // Debug dễ dàng hơn
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
