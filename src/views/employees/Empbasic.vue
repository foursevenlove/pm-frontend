<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.searchContent" placeholder="请输入查询内容" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
                <el-table-column prop="gender" label="性别"  width="55" align="center"></el-table-column>
                <el-table-column prop="nation" label="民族"  width="55" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话"  width="200" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱"  width="200" align="center"></el-table-column>
                <el-table-column prop="birthday" label="出生日期" width="140" align="center"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" width="200" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" v-model:currentPage="query.pageIndex"
                    :page-size="query.pageSize" :total="total" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="编号">
                    <el-input disabled v-model="form.id" ></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.gender">
                        <el-option key="男" label="男" value="男"/>
                        <el-option key="女" label="女" value="女"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="民族">
                    <el-input disabled v-model="form.nation"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-input v-model="form.birthday"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.idCard"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData, updateBasic } from "../../api/index";

export default {
    name: "basetable",
    setup() {
        const query = reactive({
            searchContent: "",
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const total = ref(0);
        const loading = ref(false);
        // 获取表格数据
        const getData = () => {
            fetchData(query.pageIndex, query.pageSize, query.searchContent).then((res) => {
                tableData.value = res.list;
                total.value = res.total;
                console.log(res)
            });
        };
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            getData();
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            id: "",
            name: "",
            gender: "",
            nation: "",
            phone: "",
            email: "",
            currentPage: "",
            birthday: "",
            idCard: ""
        });
        const handleEdit = (index, row) => {
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            console.log(form.birthday)
            updateBasic(form).then(() => {
                editVisible.value = false;
                ElMessage.success(`编辑成功！`);
                getData(); 
            })
        };

        return {
            query,
            tableData,
            editVisible,
            form,
            loading,
            total,

            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
