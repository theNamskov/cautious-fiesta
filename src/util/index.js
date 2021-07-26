export function resolveColor(color, theme) {
  return theme[color] || color || theme.primary;
}