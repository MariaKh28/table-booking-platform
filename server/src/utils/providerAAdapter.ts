export function providerAAdapter(providerResponse) {
  if (!providerResponse || !providerResponse.data) {
    return [];
  }

  return providerResponse.data.map((table) => ({
    id: table.table_id,
    seats: table.seats,
    available: table.available,
    provider: 'Provider A',
  }));
}
