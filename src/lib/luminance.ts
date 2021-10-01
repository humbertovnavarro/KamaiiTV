function luminance(hex: string): number {
  let c = hex.substring(1);
  let rgb = parseInt(c, 16);
  let r = (rgb >> 16) & 0xff;
  let g = (rgb >> 8) & 0xff;
  let b = (rgb >> 0) & 0xff;
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma;
}
export default luminance;
