export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (jsonState) {
      return JSON.parse(jsonState);
    }
    return undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function saveState<T>(state: T, key: string) {
  const stringState = JSON.stringify(state);
  localStorage.setItem(key, stringState);
}
