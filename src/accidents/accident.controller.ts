import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IEmployeeAccident } from './i-accidents.service';
import { EmployeeAccident } from '@prisma/client';
@Controller('accident')
export class AccidentsController {
  constructor(
    @Inject('IEmployeeAccident')
    private readonly _accidentsService: IEmployeeAccident,
  ) {}

  @Post('add')
  addAccident(@Body() dto: EmployeeAccident) {
    return this._accidentsService.addAccident(dto);
  }
  @Post('edit')
  editAccident(@Body() dto: EmployeeAccident) {
    return this._accidentsService.editAccident(dto);
  }
  @Post('disable')
  disableAccident(@Body() dto: any) {
    return this._accidentsService.disableAccident(dto);
  }
  @Post('allAccidents')
  accidentList(@Body() dto: any) {
    return this._accidentsService.accidentList(dto);
  }
}
