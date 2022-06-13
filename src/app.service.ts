import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);

  async cleanTemporal (){
    const prisma = new PrismaClient()
    await prisma.temporalEntry.deleteMany({})
    return 'Entries of The day Deleted'
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  todayLates() {
    this.cleanTemporal()
  }
}
