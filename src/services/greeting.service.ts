// Ví dụ business logic thuần: không biết HTTP, dễ unit test.
export function greet(name: string): string {
  return `Xin chào, ${name}!`;
}
