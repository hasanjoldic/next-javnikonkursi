"use client";

type ILocalStorageKey = "filters";

export class LocalStorageUtils {
  static getItem(key: ILocalStorageKey) {
    if ("localStorage" in globalThis === false) {
      return null;
    }
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
