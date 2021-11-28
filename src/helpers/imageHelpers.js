export function getSvgSizeObj(scale, dimensions, offset=[0,0]) {
  const [baseW, baseH] = dimensions;
  const [scaledW, scaledH] = dimensions.map(base => base * scale);
  const [x, y] = offset;

  const viewBox = `${x} ${y} ${baseW} ${baseH}`;
  const width = `${scaledW}px`;
  const height = `${scaledH}px`;

  return { viewBox, width, height }
}