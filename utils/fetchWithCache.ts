// @ts-ignore
import cacheData from 'memory-cache';

export async function fetchWithCache<T>(url: string): Promise<T> {
  const value = cacheData.get(url);
  if (value) {
    return value;
  } else {
    const hours = 1;
    const res = await fetch(url);
    const data = await res.json();
    cacheData.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
}