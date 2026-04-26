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

  static set(key: string, value: unknown) {
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
