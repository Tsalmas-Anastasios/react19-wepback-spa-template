 // src/config/http-client.config.ts
import axios, { AxiosInstance } from 'axios';

/**
 * Create a new Axios instance.
 * On the server, you can pass cookies/headers per request.
 * On the client, you usually don't need to pass anything.
 */
export const createHttpClient = (options?: {
    cookies?: string;
    accessToken?: string;
}): AxiosInstance => {
    const { cookies, accessToken } = options || {};

    const baseURL = process.env.BACKEND_API_URL || '';

    const instance = axios.create({
        baseURL,
        withCredentials: true, // send cookies if needed
        headers: {
            ...(cookies ? { Cookie: cookies } : {}),
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    });

    // Request interceptor (logging, attach extra headers, etc.)
    instance.interceptors.request.use(
        (config) => {
            // You can modify config here
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor (global error handling, refresh token, etc.)
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Example: log errors, map API errors, etc.
            return Promise.reject(error);
        }
    );

    return instance;
};

// Default client instance for the **browser** (no per-request info)
export const httpClient = createHttpClient();
