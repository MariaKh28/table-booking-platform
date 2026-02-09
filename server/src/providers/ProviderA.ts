export class ProviderA {
  static async fetchTables() {
    if (Math.random() < 0.2) {
      throw new Error("Provider A временно недоступен");
    }

    const tableCount = Math.floor(Math.random() * 21) + 5;
    const data = [];

    for (let i = 0; i < tableCount; i++) {
      const seats = [2, 4, 6][Math.floor(Math.random() * 3)];
      const available = Math.random() > 0.3;

      data.push({
        table_id: `a-${i + 1}`,
        seats: seats,
        available: available,
      });
    }

    return { data };
  }
}
