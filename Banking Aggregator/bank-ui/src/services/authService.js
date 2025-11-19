import API_BASE_URL from './apiConfig';

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function register(firstName, lastName, email, password, role = 'User') {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password, role })
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
