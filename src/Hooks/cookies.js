import Cookies from "js-cookie";
const setCookie = (cookieName, value) => {
  Cookies.set(cookieName, value, { expires: 7, path: "/" });
};
const getCookie = (cookieName) => {
  Cookies.get(cookieName);
};

const removeCookie = (cookieName) => {
  Cookies.remove(cookieName);
};

export { setCookie, getCookie, removeCookie };
