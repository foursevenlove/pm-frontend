import request from '../utils/request';
const Domain = "http://localhost:9999";  // 定义根域名


export const fetchData = (pageIndex, pageSize, searchContent) => {
    return request({
        url: Domain + '/basicemp',
        method: 'get',
        params: {pageIndex, pageSize, searchContent}
    });
};

export const updateBasic = (basicemp) => {
    return request({
        url: Domain + '/basicemp',
        method: 'post',
        basicemp
    });
};
