import cx, { ClassName } from 'classix';
import { twMerge } from 'fluid-tailwindcss/tailwind-merge';

export function cn(...classes: ClassName[]) {
  return twMerge(cx(...classes));
}
