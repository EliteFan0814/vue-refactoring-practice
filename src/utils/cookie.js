import Cookies from 'js-cookie'

export function getCookie(name) {
  return Cookies.get(name)
}

export function setCookie(name, value, expires = 1) {
  return Cookies.set(name, value, { expires })
}

export function delCookie(name) {
  return Cookies.remove(name)
}
