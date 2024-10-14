import httpRequest from "@/http/HttpRequest";
import { AuthCheckResponseType } from "@/types/responseTypes";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/utils";

/**
 * ログイン処理
 * 
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<void>}
 */
export const handleLogin = async (userName:string, password:string):Promise<void> => {
  const token = getFromLocalStorage('token')
  const result = await httpRequest(
    '/auth/login',
    token,
    {userName, password},
    'POST'
  )
  if (result === undefined) {
    saveToLocalStorage('token', null);
  } else {
    saveToLocalStorage('token', result.token);
  }
}

/**
 * ログアウト処理
 * 
 * @returns {Promise<void>}
 */
export const handleLogout = async ():Promise<void> => {
  const token = getFromLocalStorage('token')
  const result = await httpRequest(
    '/auth/logout',
    token,
    {token},
    'POST'
  )
  saveToLocalStorage('token', null);
}

/**
 * ログインチェック
 * 
 * @returns {Promise<AuthCheckResponseType|null>}
 */
export const checkLogin = async ():Promise<AuthCheckResponseType|null> => {
  const token = getFromLocalStorage('token')
  const result = await httpRequest(
    '/auth/check',
    token,
    {token},
    'POST'
  )
  if (result === undefined) {
    saveToLocalStorage('token', null);
    return null
  } else {
    return result as AuthCheckResponseType
  }
}

/**
 * 管理ユーザーのログイン処理
 * 
 * @param {string} userName
 * @param {string} password
 * @returns {Promise<void>}
 */
export const handleAdminLogin = async (userName:string, password:string):Promise<void> => {
  const token = getFromLocalStorage('adminToken')
  const result = await httpRequest(
    '/auth/admin/login',
    token,
    {userName, password},
    'POST'
  )
  if (result === undefined) {
    saveToLocalStorage('adminToken', null);
  } else {
    saveToLocalStorage('adminToken', result.token);
    window.location.href = '/admin/dashboard';
  }
}

/**
 * 管理ユーザーログアウト処理
 * 
 * @returns {Promise<void>}
 */
export const handleAdminLogout = async ():Promise<void> => {
  const token = getFromLocalStorage('adminToken')
  const result = await httpRequest(
    '/auth/admin/logout',
    token,
    {token},
    'POST'
  )
  saveToLocalStorage('adminToken', null);
  window.location.href = '/';
}

/**
 * 管理ユーザーログインチェック
 * 
 * @returns {Promise<AuthCheckResponseType|null>}
 */
export const checkAdminLogin = async ():Promise<AuthCheckResponseType|null> => {
  const token = getFromLocalStorage('adminToken')
  const result = await httpRequest(
    '/auth/admin/check',
    token,
    {token},
    'POST'
  )
  if (result === undefined) {
    saveToLocalStorage('adminToken', null);
    return null
  } else {
    return result as AuthCheckResponseType
  }
}
