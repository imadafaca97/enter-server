import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  todayLates() {
    console.log('hola tonto');
  }
}
