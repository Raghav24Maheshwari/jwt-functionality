import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enum';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const userRepo: Repository<User> = dataSource.getRepository(User);

  const existingAdmin = await userRepo.findOne({ where: { email: 'raghavmaheshwari598@gmail.com' } });
  if (existingAdmin) {
    console.log('Admin already exists');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash('AdminPassword123', 10);

  const adminUser = userRepo.create({
    userName: 'Admin',
    email: 'raghavmaheshwari598@gmail.com',
    password: hashedPassword,
    role: Role.ADMIN,
    isActive: true,
    isDeleted: false,
  });

  await userRepo.save(adminUser);
  console.log('Admin user seeded successfully');
  await app.close();
}
bootstrap();
