<template>
    <el-main>
        <el-row class="first_row">
            <el-col :span="12" class="left">
                <el-menu class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1"><router-link to="/admin/menu/entry">一口式受理平台</router-link></el-menu-item>
                    <el-menu-item index="2"><router-link to="/admin/menu/grid">网格化管理平台</router-link></el-menu-item>
                    <el-menu-item index="3"><router-link to="/admin/menu/public">公共服务平台</router-link></el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="12">
                <el-menu class="el-menu-demo" mode="horizontal" style="float:right">
                    <el-menu-item index="1">
                            <el-badge :value="12" class="item">
                            <i class="el-icon-bell"></i>
                        </el-badge>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-badge :value="3" class="item">
                            <i class="el-icon-message"></i>
                        </el-badge>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                管理员 {{$store.state.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="clearfix" >
                                <span @click="loginOut">退出</span>
                                <el-badge class="mark" :value="12" />
                                </el-dropdown-item>
                                <el-dropdown-item class="clearfix">
                                回复
                                    <el-badge class="mark" :value="3" />
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <el-row class="secend_row">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>......</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">{{this.$store.state.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row> 
        <el-row>
            <router-view></router-view> 
        </el-row>
        
    </el-main>
    
        
</template>

<script>
import { delCookie } from '../../utils/utils';
export default {
  name: "myMain",
  data () {
    return {
            name: ''
        };
    },
    methods: {
        loginOut () {
            delCookie('token');
            this.$router.push({name: 'login'});
        }
    }
};
</script>

<style scoped lang="scss">
.el-main {
  padding: 0;
  background: #eee;
}
.first_row {
  box-shadow: 0 3px 3px #ccc;
  background: #fff;
  a{
      display: inline-block;
      width: 100%;
      height: 100%;
      padding:0 20px;
      text-decoration: none;
      margin-left: -20px;
  }
}
.secend_row {
  height: 40px;
  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
  }
}
.left .el-menu-item{
    line-height: 60px;
}
.el-menu-demo{
    line-height: 100%;
}
.item{
    top:10px;
}
.el-menu-item{
    line-height: 40px;
    .el-dropdown{
        line-height: 60px;
    }
}
.router-link-active{
    background: darkcyan;
    color:#fff !important;
}
</style>
