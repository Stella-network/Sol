/**
 * ローカルストレージにデータを保存する
 * 
 * @param {string} key 
 * @param {any} value 
 * @returns {void}
 */
export const saveToLocalStorage = (key: string, value: any):void => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * ローカルストレージからデータを取得する
 * 
 * @param {string} key 
 * @returns {any}
 */
export const getFromLocalStorage = (key: string):any => {
  const item = localStorage.getItem(key)
  if (item === "undefined" || item === undefined || item === null) {
    return null
  }
  return item ? JSON.parse(item) : null
}
