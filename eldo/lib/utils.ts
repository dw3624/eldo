import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMonthName = (num: number) => {
  if (!num || isNaN(num)) return '-';
  // 0부터 시작하므로 num - 1을 해줍니다.
  const date = new Date(2000, Math.floor(num) - 1);
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
};
