<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs" :key="subItem.index">
                            <el-menu-item :index="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
            },
            {
                icon: "el-icon-user-solid",
                index: "/",
                title: "员工资料",
                subs: [
                        {
                            index: "/basic",
                            title: "基本资料",
                        },
                        {
                            index: "/advanced",
                            title: "高级资料",
                        },
                ],
            },
            {
                icon: "el-icon-menu",
                index: "/",
                title: "人事管理",
                subs: [
                        {
                            index: "/basic",
                            title: "员工奖惩",
                        },
                        {
                            index: "/advanced",
                            title: "员工培训",
                        },
                        {
                            index: "/advanced",
                            title: "员工好评",
                        },
                        {
                            index: "/advanced",
                            title: "员工调动",
                        },
                ],
            },
            {
                icon: "el-icon-coin",
                index: "/",
                title: "薪资管理",
                subs: [
                        {
                            index: "/basic",
                            title: "工资账套管理",
                        },
                        {
                            index: "/advanced",
                            title: "员工账套设置",
                        },
                ],
            },
            {
                icon: "el-icon-s-data",
                index: "/",
                title: "统计管理",
                subs: [
                        {
                            index: "/basic",
                            title: "员工积分统计",
                        },
                        {
                            index: "/advanced",
                            title: "人事信息统计",
                        },
                        {
                            index: "/advanced",
                            title: "人事记录统计",
                        },
                ],
            },
            {
                icon: "el-icon-s-tools",
                index: "/",
                title: "系统管理",
                subs: [
                        {
                            index: "/basic",
                            title: "基础信息设置",
                        },
                        {
                            index: "/advanced",
                            title: "系统管理",
                        },
                        {
                            index: "/advanced",
                            title: "操作日志管理",
                        },
                        {
                            index: "/advanced",
                            title: "操作员管理",
                        },
                ],
            },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
