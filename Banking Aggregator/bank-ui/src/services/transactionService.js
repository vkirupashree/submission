import API_BASE_URL from './apiConfig';

export async function fetchTransactions(token, accountId, from, to) {
  let url = `${API_BASE_URL}/transaction`;
  const params = [];
  if (accountId) params.push(`accountId=${accountId}`);
  if (from) params.push(`from=${from}`);
  if (to) params.push(`to=${to}`);
  if (params.length) url += '?' + params.join('&');
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
}
