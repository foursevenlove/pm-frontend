import request from '../utils/request';

export const getNation = () => {
    return request({
        url: '/nation',
        method: 'get',
    });
};