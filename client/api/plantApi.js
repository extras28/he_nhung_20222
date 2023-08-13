import axiosClient from './axiosClient';

const plantApi = {
    getListPlant: params => {
        const url = '/plant/find';
        return axiosClient.get(url, { params });
    },

    getDetail: params => {
        const url = '/plant/detail';
        return axiosClient.get(url, { params });
    },

    toggleAutoMode: params => {
        const url = '/plant/auto-mode';
        return axiosClient.post(url, params);
    },

    manualControl: params => {
        const url = '/plant/control';
        return axiosClient.post(url, params);
    },

    setMoistureBreakpoint: params => {
        const url = '/plant/breakpoint';
        return axiosClient.post(url, params);
    },

    createPlant: params => {
        const url = '/plant/create';
        return axiosClient.post(url, params);
    },

    updatePlant: params => {
        const url = '/plant/update';
        return axiosClient.put(url, params);
    },

    deletePlant: params => {
        const url = '/plant/delete';
        return axiosClient.delete(url, { params });
    },
};

export default plantApi;
