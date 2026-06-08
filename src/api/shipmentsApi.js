const API_URL = 'https://shipping.ifrstech.com/api/rows';

export async function fetchShipments(page = 1, pageSize = 20) {
  const url = `${API_URL}?page=${page}&pageSize=${pageSize}&q=in_transit`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to load shipment data. Please try again.');
  }

  const payload = await response.json();

  return payload;
}
