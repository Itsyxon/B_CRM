class LocalStorage {
  static get<T>(key: string): T | undefined {
    try {
      const storage = localStorage.getItem(key)
      if (storage) {
        return JSON.parse(storage) as unknown as T
      }
    } catch {
      return undefined
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static set(key: string, value: string | Record<string, any>) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static delete(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }
}

export default LocalStorage
