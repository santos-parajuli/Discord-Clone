// this i a function made up of tailwindMerge and clsx
// twMerge is used to merge conflicting classes
// clsx is used to apply classes conditionally.
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
