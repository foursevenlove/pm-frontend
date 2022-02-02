import request from '../utils/request';

export const getJoblevel = () => {
    return request({
        url: '/joblevel',
        method: 'get',
    });
};