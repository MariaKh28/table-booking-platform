import { Injectable } from "@nestjs/common";
import { ProviderA } from "../providers/ProviderA";
import { ProviderB } from "../providers/ProviderB";
import { providerAAdapter } from "../utils/providerAAdapter";
import { providerBAdapter } from "../utils/providerBAdapter";
@Injectable()
export class TableGatewayService {
  async getAllTables(date: string, partySize?: number) {
    const errors = [];
    const results = [];

    const promises = [
      ProviderA.fetchTables()
        .then((data) => {
          const adapted = providerAAdapter(data);
          results.push(...adapted);
        })
        .catch((error) => {
          errors.push({
            provider: "Provider A",
            message: error.message || "Provider A временно недоступен",
          });
        }),
      ProviderB.fetchTables()
        .then((data) => {
          const adapted = providerBAdapter(data);
          results.push(...adapted);
        })
        .catch((error) => {
          errors.push({
            provider: "Provider B",
            message: error.message || "Provider B временно недоступен",
          });
        }),
    ];

    await Promise.allSettled(promises);

    let filteredResults = results;

    const MAX_TABLES = 25;

    if (filteredResults.length > MAX_TABLES) {
      filteredResults = filteredResults.slice(0, MAX_TABLES);
    }

    return { tables: filteredResults, errors };
  }
}
