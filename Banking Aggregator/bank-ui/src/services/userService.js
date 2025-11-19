import API_BASE_URL from './apiConfig';

/**
 * @param {string} token
 */
export async function fetchUsers(token) {
  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

/**
 * @param {string|number} id
 * @param {any} user
 * @param {string} token
 */
export async function updateUser(id, user, token) {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(user)
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
}

/**
 * @param {string|number} id
 * @param {string} token
 */
export async function deleteUser(id, token) {
  const response = await fetch(`${API_BASE_URL}/user/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete user');
  // No response body expected
}
