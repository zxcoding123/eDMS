import type { User } from './store';

export const mockUsers: Array<User & { password: string; department: string }> =
  [
    {
      id: '1',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      department: 'IT'
    },
    {
      id: '2',
      username: 'editor1',
      password: 'editor123',
      role: 'editor',
      department: 'HR'
    },
    {
      id: '3',
      username: 'viewer1',
      password: 'viewer123',
      role: 'viewer',
      department: 'Finance'
    }
  ];

export async function mockLogin(
  username: string,
  password: string
): Promise<User & { department: string }> {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw new Error('Invalid username or password');
  }

  // simulate network delay
  await new Promise((r) => setTimeout(r, 600));

  const { password: _, ...safeUser } = user;
  return safeUser;
}
