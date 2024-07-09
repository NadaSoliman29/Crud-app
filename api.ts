// utils/api.ts
import { User } from "../types/user";

const BASE_URL = 'https://dummyjson.com/users';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data: User[] = await response.json();
  return data;
}

export async function addUser(newUser: User): Promise<User> {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  const data: User = await response.json();
  return data;
}

export async function updateUser(updatedUser: User): Promise<User> {
  const url = `${BASE_URL}/${updatedUser.id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  const data: User = await response.json();
  return data;
}

export async function deleteUser(userId: string): Promise<void> {
  const url = `${BASE_URL}/${userId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}
