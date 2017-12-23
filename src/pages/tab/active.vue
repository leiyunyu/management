<template>
    <el-row>
        <el-col :span="24" class="tab">
            <el-tabs type="border-card">
                <el-tab-pane label="活动管理"><my-active1></my-active1></el-tab-pane>
                <el-tab-pane label="邀请居民"><my-active2></my-active2></el-tab-pane>
                <el-tab-pane label="居民报名"><my-active3></my-active3></el-tab-pane>
                <el-tab-pane label="活动总结"><my-active4></my-active4></el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
import myActive1 from '../activeGuan/active1.vue';
import myActive2 from '../activeGuan/active2.vue';
import myActive3 from '../activeGuan/active3.vue';
import myActive4 from '../activeGuan/active4.vue';
export default {
    name: 'active',
    components: {
        myActive1,
        myActive2,
        myActive3,
        myActive4
    }
}
</script>

<style scoped lang="scss">
    .tab{
        margin-top: 25px;
    }
</style>
