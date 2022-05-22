import { Body, Controller, Get, Post} from '@nestjs/common';
import { maestrosService } from './maestros.service';

@Controller('maestros')
export class maestrosController{
    constructor(private maestrosService : maestrosService){}
    
    @Get('get')
    getall() {
        return this.maestrosService.getall();
    }

    @Post('add')
    addEmployee(@Body() dto: any) {
      return this.maestrosService.addMaestro(dto);
    }



}
