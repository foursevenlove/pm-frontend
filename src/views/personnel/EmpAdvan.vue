<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.searchContent" placeholder="请输入查询内容" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView" icon="el-icon-arrow-down">
                    <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'arrow-down-bold'"
                        aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div v-show="showAdvanceSearchView"
                     style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
                <el-row>
                    <el-col :span="5">
                        政治面貌:
                        <el-select v-model="query.politicId" placeholder="政治面貌" size="mini"
                                    style="width: 130px;">
                            <el-option
                                    v-for="item in politicsstatus"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        民族:
                        <el-select v-model="query.nationId" placeholder="民族" size="mini"
                                    style="width: 130px;">
                            <el-option
                                    v-for="item in nations"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        职位:
                        <el-select v-model="query.posId" placeholder="职位" size="mini" style="width: 130px;">
                            <el-option
                                    v-for="item in positions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        职称:
                        <el-select v-model="query.jobLevelId" placeholder="职称" size="mini"
                                    style="width: 130px;">
                            <el-option
                                    v-for="item in joblevels"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="7">
                        聘用形式:
                        <el-radio-group v-model="query.engageForm">
                            <el-radio label="劳动合同">劳动合同</el-radio>
                            <el-radio label="劳务合同">劳务合同</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 10px" >
                    <el-col  >
                        <el-button size="mini">取消</el-button>
                        <el-button size="mini" icon="el-icon-search" type="primary" @click="handleSearch">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column fixed prop="name" label="姓名" width="100" align="center"></el-table-column>
                <el-table-column prop="workID" label="工号"  width="150" align="center"></el-table-column>
                <el-table-column prop="department" label="部门"  width="150" align="center"></el-table-column>
                <el-table-column prop="position" label="岗位"  width="150" align="center"></el-table-column>
                <el-table-column prop="jobLevel" label="职称等级"  width="150" align="center"></el-table-column>
                <el-table-column prop="engageForm" label="聘用形式" width="150" align="center"></el-table-column>
                <el-table-column prop="contractTerm" label="合同期限"  width="50" align="center"></el-table-column>
                <el-table-column prop="beginDate" label="入职日期" width="150" align="center"></el-table-column>
                <el-table-column prop="beginContract" label="合同起始日期" width="150" align="center"></el-table-column>
                <el-table-column prop="endContract" label="合同终止日期" width="150" align="center"></el-table-column>

                <el-table-column fixed="right" label="操作" width="180" align="center">
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
        <el-dialog
                title="编辑" v-model="editVisible"
                width="80%">
            <div>
                <el-form ref="empForm" :rules="rules"  :model="form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="form.name"
                                          placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker
                                        v-model="form.birthday"
                                        size="mini"
                                        type="date"
                                        value-format="YYYY-MM-DD"
                                        style="width: 150px;"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:" prop="politicId">
                                <el-select v-model="form.politicId" placeholder="政治面貌" size="mini" style="width: 200px;">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:" prop="nationId">
                                <el-select v-model="form.nationId" placeholder="民族" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯:" prop="nativePlace">
                                <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                          v-model="form.email" placeholder="请输入电子邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="form.address" placeholder="请输入联系地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="posId">
                                <el-select v-model="form.posId" placeholder="职位" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称:" prop="jobLevelId">
                                <el-select v-model="form.jobLevelId" placeholder="职称" size="mini" style="width: 150px;">
                                    <el-option
                                            v-for="item in joblevels"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                          v-model="form.phone" placeholder="电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workID">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="form.workID" placeholder="工号" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tiptopDegree">
                                <el-select v-model="form.tiptopDegree" placeholder="学历" size="mini"
                                           style="width: 150px;">
                                    <el-option
                                            v-for="item in tiptopDegrees"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="form.school" placeholder="毕业院校名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="form.specialty" placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期:" prop="beginDate">
                                <el-date-picker
                                        v-model="form.beginDate"
                                        size="mini"
                                        type="date"
                                        value-format="YYYY-MM-DD"
                                        style="width: 130px;"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="转正日期:" prop="conversionTime">
                                <el-date-picker
                                        v-model="form.conversionTime"
                                        size="mini"
                                        type="date"
                                        value-format="YYYY-MM-DD"
                                        style="width: 130px;"
                                        placeholder="转正日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期:" prop="beginContract">
                                <el-date-picker
                                        v-model="form.beginContract"
                                        size="mini"
                                        type="date"
                                        value-format="YYYY-MM-DD"
                                        style="width: 130px;"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同终止日期:" prop="endContract">
                                <el-date-picker
                                        v-model="form.endContract"
                                        size="mini"
                                        type="date"
                                        value-format="YYYY-MM-DD"
                                        style="width: 150px;"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                          v-model="form.idCard" placeholder="请输入身份证号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式:" prop="engageForm">
                                <el-radio-group v-model="form.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio-group v-model="form.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
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
import { fetchData, updateEmp, deleteEmp } from "../../api/employee";
import { getPolitic } from "../../api/politicstatus"
import { getNation } from "../../api/nation"
import { getJoblevel } from "../../api/joblevels"
import { getPosition } from "../../api/position"

export default {
    name: "empBasic",
    setup() {
        const query = reactive({
            searchContent: "",
            pageIndex: 1,
            pageSize: 10,
            politicId: "",
            nationId: "",
            jobLevelId: "",
            posId: "",
            engageForm: "",
        });
        const tableData = ref([]);
        const politicsstatus = ref([]);
        const nations = ref([]);
        const joblevels = ref([]);
        const positions = ref([])
        const total = ref(0);
        const loading = ref(false);
        const showAdvanceSearchView = ref(false);
        const tiptopDegrees = ref(['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他']);
        const rules = reactive(
            {
                name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                    message: '身份证号码格式不正确',
                    trigger: 'blur'
                }],
                wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
                nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
                    type: 'email',
                    message: '邮箱格式不正确',
                    trigger: 'blur'
                }],
                phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
                address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
                departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
                posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
                engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
                specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
                workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
                contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
                conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
                workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}],
            }
        )
        // 获取表格数据
        const getData = () => {
            fetchData(query.pageIndex, query.pageSize, 
                query.searchContent, query.politicId, query.nationId, query.jobLevelId,query.posId,query.engageForm
                ).then((res) => {
                    tableData.value = res.list;
                    total.value = res.total;
                }); 
        };
        getData();
        getPolitic().then((res) => {
            politicsstatus.value = res.list;
        });
        getJoblevel().then((res) => {
            joblevels.value = res.list;
            console.log(res.list)
        });
        getNation().then((res) => {
            nations.value = res.list;
        });
        getPosition().then((res) => {
            positions.value = res.list
            console.log(res.list)
        })

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
        const handleDelete = (index,row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            }).then(() => {
                deleteEmp(row['id']).then(() => {
                    ElMessage.success("删除成功");
                    getData();
                })
            });
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            id: "",
            name: "",
            gender: "",
            birthday: "",
            idCard: "",
            wedlock: "",
            nationId: 1,
            nativePlace: "",
            politicId: 13,
            email: "",
            phone: "",
            address: "",
            departmentId: null,
            jobLevelId: 9,
            posId: 29,
            engageForm: "",
            tiptopDegree: "",
            specialty: "",
            school: "",
            beginDate: "",
            workID: "",
            contractTerm: 2,
            conversionTime: "",
            notworkDate: null,
            beginContract: "",
            endContract: "",
            workAge: null
        });
        const handleEdit = (index, row) => {
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
            console.log(form.birthday)
            updateEmp(form).then(() => {
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
            politicsstatus,
            nations,
            joblevels,
            positions,
            tiptopDegrees,
            rules,
            showAdvanceSearchView,

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
