<template>
    <el-aside>
        <el-row class="tac">
            <el-col :span="24">
                <div class="message">
                    <h2>三鑫智慧社区</h2>
                    <h3>公共管理平台</h3>
                    <dl>
                        <dt><img src="../../../static/img/1.jpg"></dt>
                        <dd>管理员 {{$store.state.username}}</dd>
                    </dl>
                </div>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#29282e" text-color="#fff"  active-text-color="#ffd04b">
                        <div v-for="(item, index) in $store.state.menu" :key="index">
                            <el-submenu v-if="item.submenus" :index="index.toString()">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <div v-for="(sub_item, sub_index) in item.submenus" :key="sub_index">
                        <el-submenu v-if="sub_item.submenus" :index="index + '-' + sub_index">
                            <template slot="title">{{sub_item.name}}</template>
                            <div v-for="(sub_sub_item, sub_sub_index) in sub_item.submenus" :key="sub_sub_index">
                                <el-menu-item @click="change_router(sub_sub_item.type,sub_sub_item.id,sub_sub_item.name)" :index="index + '-' + sub_index + '-' + sub_sub_index">{{sub_sub_item.name}}</el-menu-item>
                            </div>
                        </el-submenu>
                        <el-menu-item v-if="!sub_item.submenus" :index="index + '-' + sub_index">{{sub_item.name}}</el-menu-item>
                        </div>
                    </el-submenu>
                    <el-menu-item v-if="item.submenus" :index="index.toString()">{{item.name}}</el-menu-item>
                    </div>
                </el-menu>
            </el-col>
        </el-row>
    </el-aside>
</template>

<script>
import axios from 'axios'
export default {
    name: 'myAside',
    data () {
        return {
            menus:[]
        };
    },
    created () {
        
    },
    methods: {
        change_router(type,id,name){
            console.log(this.name)
            this.$store.commit('updata_name', name)
            console.log(type, id, name);
            this.$router.push({name: 'activity', params: {id: id}})
        }
    },
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
.el-menu-vertical-demo{
    margin-right:-1px;
}
    .message{
        background: #29282e;
        color:#fff;
        text-align: center;
        border-bottom:1px solid #ccc;
        overflow-x:hidden;
        h2{
            font-size:18px;
            line-height: 40px;
        }
        dl{
            margin-top: 10px;
            dt{
                margin:0 auto;
                width: 60px;
                height: 60px;
                img{
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                line-height: 50px;
            }
        }
    }
</style>
