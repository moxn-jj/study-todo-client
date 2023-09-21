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