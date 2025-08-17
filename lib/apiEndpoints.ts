import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`;
export const SIGNUP_URL = `${BASE_URL}/auth/signup`;
export const SIGNIN_URL = `${BASE_URL}/auth/signin`;
export const USER_URL = `${BASE_URL}/auth/user`;
export const SIGNOUT_URL = `${BASE_URL}/auth/signout`;
export const VERIFY_EMAIL_URL = `${BASE_URL}/verify`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${BASE_URL}/auth/reset-password`;
export const PORTFOLIOS_URL = `${BASE_URL}/portfolio`;
export const BLOGS_URL = `${BASE_URL}/blogs`;
