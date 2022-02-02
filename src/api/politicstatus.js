import request from '../utils/request';

export const getPolitic = () => {
    return request({
        url: '/politic',
        method: 'get',
    });
};