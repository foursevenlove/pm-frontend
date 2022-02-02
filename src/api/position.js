import request from '../utils/request';

export const getPosition = () => {
    return request({
        url: '/position',
        method: 'get',
    });
};