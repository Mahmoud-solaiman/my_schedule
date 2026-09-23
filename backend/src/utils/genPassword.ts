export function genPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*/';

  let password = '';
  for (let i = 0; i < 10; i++) {
    const randonNum = Math.floor(Math.random() * chars.length);
    password += chars[randonNum];
  }

  return password;
}