export function createCubicBezierPath(x1, y1, x2, y2) {
  const cx1 = x1 + (x2 - x1) / 2;
  return `M ${x1},${y1} C ${cx1},${y1} ${cx1},${y2} ${x2},${y2}`;
}