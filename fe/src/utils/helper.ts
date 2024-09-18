export const removeLocalStorage = () => {
  localStorage.clear()
}

export const getLocalStorage = (itemStorage: string) => {
  return localStorage.getItem(itemStorage)
}

export const setLocalStorage = (itemStorage: string, data: string) => {
  localStorage.setItem(itemStorage, data)
}

export const getListPaths = (pageRoute: any) => {
  return pageRoute.map((page: any) => page?.path)
}
