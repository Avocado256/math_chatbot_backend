import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  // This module is intentionally left empty.
  // It serves as a global module for Prisma-related services.
  // You can add providers or exports here as needed in the future.
}
