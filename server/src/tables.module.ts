import { Module } from "@nestjs/common";
import { TablesController } from "./controllers/Tables.controller";
import { TableGatewayService } from "./services/TableGateway.service";

@Module({
  controllers: [TablesController],
  providers: [TableGatewayService],
})
export class TablesModule {}
