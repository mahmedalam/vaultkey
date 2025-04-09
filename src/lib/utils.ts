import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const intervals: { seconds: number; unit: string }[] = [
    { seconds: 60 * 60 * 24 * 365, unit: "year" },
    { seconds: 60 * 60 * 24 * 30, unit: "month" },
    { seconds: 60 * 60 * 24 * 7, unit: "week" },
    { seconds: 60 * 60 * 24, unit: "day" },
    { seconds: 60 * 60, unit: "hour" },
    { seconds: 60, unit: "minute" },
    { seconds: 1, unit: "second" },
  ];

  for (const { seconds: intervalSeconds, unit } of intervals) {
    if (seconds >= intervalSeconds) {
      const value = Math.floor(seconds / intervalSeconds);
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function calculatePasswordStrength(
  password: string,
): "Low" | "Medium" | "High" {
  // Check for minimum length
  const hasMinLength = password.length >= 8;

  // Check for character variety
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);

  // Count the different character types present
  const varietyCount = [
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
  ].filter(Boolean).length;

  // Determine strength based on criteria
  if (!hasMinLength || varietyCount <= 1) {
    return "Low";
  } else if (varietyCount === 2 || varietyCount === 3) {
    return "Medium";
  } else {
    return "High";
  }
}
