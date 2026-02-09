export function providerBAdapter(providerResponse: string) {
  if (!providerResponse || typeof providerResponse !== "string") {
    return [];
  }

  const tables = providerResponse.split("|");
  const result = [];

  for (const tableStr of tables) {
    const parts = tableStr.split(":");

    if (parts.length === 3) {
      const [id, seats, available] = parts;
      result.push({
        id: `b-${id}`,
        seats: parseInt(seats, 10),
        available: available === "1",
        provider: "Provider B",
      });
    }
  }

  return result;
}
