import { Controller, Get, Query } from '@nestjs/common';
import { TableGatewayService } from '../services/TableGateway.service';
import { formatResponse } from '../utils/formatResponse';

@Controller('search')
export class TablesController {
  constructor(private readonly tableGatewayService: TableGatewayService) {}
  @Get()
  async getTables(
    @Query('date') date: string,
    @Query('partySize') partySize?: string,
  ) {
    
    const partySizeNum = partySize && parseInt(partySize) || null;
    
    const { tables, errors } = await this.tableGatewayService.getAllTables(date, partySizeNum);
    return formatResponse(200, 'Success', tables, errors.length > 0 && errors || null);
  }
}

