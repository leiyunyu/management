<template>
    <div>
        <el-row class="fouth_row"> 
        <el-row class="third_row">
            <div>
                <router-link to="/admin/menu/public/message">信息管理</router-link>
                <router-link to="/admin/menu/public/active">活动管理</router-link>
            </div>
        </el-row>
            <router-view></router-view>        
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'myPublic',
    created () {
        this.$store.commit('watch', true)
        this.$http.get('/admin/menu/public').then((res) => {
            this.$store.commit('updata_menu', res.data.data);
            this.$store.commit('watch', false);
        })
    }
}
</script>

<style scoped lang="scss">
.third_row {
        text-align: center;
        height: 60px;
        a{
            display: inline-block;
            padding:10px 10px;
            border:1px solid #ccc;
            border-radius: 5px;
            text-decoration: none;
            width: 140px;
        }
    }
.fouth_row{
    padding:0 15px;
}
.router-link-active{
    background: #01b0b9;
    color:#fff !important;
}
</style>
