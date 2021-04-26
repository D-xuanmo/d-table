const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

/**
 * 金额千分位
 * @param {String} str 需要格式化的数字
 * @returns {String}
 */
export const moneyFormat = str => str.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')

/**
 * 是否为空
 * @param {*} value
 * @returns {Boolean}
 */
export function isEmpty (value) {
  if (Array.isArray(value)) return value.length === 0

  if (isObject(value)) return JSON.stringify(value) === '{}'

  return [null, undefined, ''].includes(value)
}
