export function percent(num, denom) {
  const percent = (num/denom) * 100;
  return Math.round(percent*10) / 10;
}

// Fudge the numbers a bit for CSS width-niceness.
export function fudgePercentage(percent) {
  if (percent < 1) return 1;
  if (percent === 100) return 101;
  return percent;
}