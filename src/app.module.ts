import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountContoller } from './controllers/create-account.controller'

@Module({
  imports: [],
  controllers: [CreateAccountContoller],
  providers: [PrismaService],
})
export class AppModule {}
