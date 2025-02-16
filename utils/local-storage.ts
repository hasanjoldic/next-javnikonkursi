type ILocalStorageKey = "filters";

export class LocalStorageUtils {
  static getItem(key: ILocalStorageKey) {
    return localStorage.getItem(key);
  }

  static setItem(key: ILocalStorageKey, value: string | null) {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  }
}
