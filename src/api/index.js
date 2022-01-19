import request from '../utils/request';

export const fetchData = (pageIndex, pageSize, searchContent) => {
    return request({
        url: '/basicemp',
        method: 'get',
        params: {pageIndex, pageSize, searchContent}
    });
};

export const updateBasic = (basicemp) => {
    return request({
        url: '/basicemp',
        method: 'post',
        data: basicemp
    });
};
