import { Module } from "@nestjs/common";
import { TablesModule } from "./tables.module";

@Module({
  imports: [TablesModule],
})
export class AppModule {}

