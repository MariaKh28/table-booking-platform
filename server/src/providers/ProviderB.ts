export class ProviderB {
  static async fetchTables() {
    if (Math.random() < 0.2) {
      throw new Error("Provider B временно недоступен");
    }

    const tableCount = Math.floor(Math.random() * 21) + 5;
    const tables = [];

    for (let i = 0; i < tableCount; i++) {
      const id = 100 + i + 1;
      const seats = [2, 4, 6][Math.floor(Math.random() * 3)];
      const available = Math.random() > 0.3 ? 1 : 0;

      tables.push(`${id}:${seats}:${available}`);
    }

    return tables.join("|");
  }
}
