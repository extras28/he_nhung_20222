import axiosClient from './axiosClient';

const authApi = {
    login: params => {
        const url = '/account/sign-in';
        return axiosClient.post(url, params);
    },
    signUp: params => {
        const url = '/account/sign-up';
        return axiosClient.post(url, params);
    },
    logOut: params => {
        const url = '/account/sign-out';
        return axiosClient.post(url, params);
    },
};

export default authApi;
