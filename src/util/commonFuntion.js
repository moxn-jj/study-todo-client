// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 멤버 필드 유효성 체크 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
export const isValidEmail = (email) => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
    return password.length > 3;
};

export const isValidPasswordCheck = (password, passwordCheck) => {
    return password === passwordCheck;
};

// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ access token 관리 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
const TOKEN_KEY = 'accessToken';

export const saveToken = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

export const hasToken = () => {
    return getToken() !== null;
};