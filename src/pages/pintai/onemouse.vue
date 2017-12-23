<template>
    <div class="entry">
        <h2>活动列表</h2>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item, index) in activeList.list" :key="index">
                <h6>{{item.name}}</h6>
                <h2>{{item.locationName}}</h2>
                <h4>{{item.startDate}}</h4>
            </el-carousel-item>
        </el-carousel>
        <div class="third_row">
            <router-link to="/admin/menu/entry/activeInfo">活动信息与报名</router-link>
            <router-link to="/admin/menu/entry/people">人员管理</router-link>
        </div>
        <router-view></router-view>  
    </div>
</template>

<script>
import activeList from '../../../server/data/active_list.json';
export default {
    name: 'myOnemouse',
    data () {
        return {
            activeList: activeList
        };
    },
    created () {
        this.$store.commit('watch', true)
        this.$http.get('admin/menu/entry').then((res) => {
            this.$store.commit('updata_menu', res.data.data);
            this.$store.commit('watch', false);
        })
        console.log(activeList.list)
        activeList.list.forEach((item, index) => {
            this.name = item.name,
            this.addr = item.locationName,
            this.date = item.startDate
        })
    }
}
</script>

<style scoped lang="scss">
.entry{
    width: 100%;
    height: 260px;
    background: #fff;
    box-sizing: border-box;
    padding:0 20px;
    h2{
        line-height: 50px;
        font-size:24px;
        font-weight: 400;
    }
}

    .el-carousel__item {
        h6{
            margin-top: 50px;
        }
        h6,h2,h4{
            font-size:16px;
            font-weight: 600;
            text-align: center;
        }
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #01b0b9;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
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
    .router-link-active{
        background: #01b0b9;
        color:#fff !important;
    }
</style>
