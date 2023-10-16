export function uniqueArrayByKey<T>(arr: T[], key: keyof T) {
  const map: Record<string, T> = {};
  arr.forEach((item) => {
    map[`${item[key]}`] = item;
  });
  return Object.values(map);
}
