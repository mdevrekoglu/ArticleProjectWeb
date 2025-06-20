export function getEnumKeyByValue<T extends object>(
  enumObj: T,
  value: number | string
): string | undefined {
  const rawKey = Object.keys(enumObj).find(
    key => (enumObj as any)[key] === value
  );

  if (!rawKey) return undefined;

  return rawKey.replace(/([a-z])([A-Z])/g, '$1 $2');
}
