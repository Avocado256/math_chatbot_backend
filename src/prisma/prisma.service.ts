import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log('Prisma connected successfully');
      })
      .catch((error) => {
        console.error('Prisma connection error:', error);
      });
  }

  async onModuleDestroy() {
    await this.$disconnect()
      .then(() => {
        console.log('Prisma disconnected successfully');
      })
      .catch((error) => {
        console.error('Prisma disconnection error:', error);
      });
  }
}
