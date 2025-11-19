import API_BASE_URL from './apiConfig';

/**
 * @param {string} token
 * @returns {Promise<any[]>}
 */
export async function fetchBanks(token) {
  const response = await fetch(`${API_BASE_URL}/bank`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch banks');
  return response.json();
}

/**
 * @param {any} bank
 * @param {string} token
 * @returns {Promise<any>}
 */
export async function addBank(bank, token) {
  const response = await fetch(`${API_BASE_URL}/bank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(bank)
  });
  if (!response.ok) throw new Error('Failed to add bank');
  return response.json();
}

/**
 * @param {number} bankId
 * @param {string} token
 * @returns {Promise<any[]>}
 */
export async function fetchBranches(bankId, token) {
  const response = await fetch(`${API_BASE_URL}/bank/${bankId}/branches`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch branches');
  return response.json();
}

/**
 * @param {number} bankId
 * @param {any} branch
 * @param {string} token
 * @returns {Promise<any>}
 */
export async function addBranch(bankId, branch, token) {
  const response = await fetch(`${API_BASE_URL}/bank/${bankId}/branches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(branch)
  });
  if (!response.ok) throw new Error('Failed to add branch');
  return response.json();
}
