import request from '../utils/request';

export const fetchData = (pageIndex, pageSize, searchContent) => {
    return request({
        url: '/emp',
        method: 'get',
        params: {pageIndex, pageSize, searchContent}
    });
};

export const updateEmp = (emp) => {
    return request({
        url: '/emp',
        method: 'post',
        data: emp
    });
};

export const deleteEmp = (empId) => {
    return request({
        url: '/emp',
        method: 'delete',
        params: {empId}
    });
};
