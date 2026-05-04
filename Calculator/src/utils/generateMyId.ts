export function generateMyId(): string {
  return `hero_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}