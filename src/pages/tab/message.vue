<template>
    <div class="message"> 
        <h2>信息管理</h2>
        <el-row>
            <el-col :span="12">
                <span>责任人</span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        选择责任人<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>张鑫：15584423665 街道办事处</el-dropdown-item>
                        <el-dropdown-item>王亮：15584423665 街道办事处</el-dropdown-item>
                        <el-dropdown-item>李明：15584423665 街道办事处</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-col>
            <el-col :span="12">
                <span>责任人单位</span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        选择责任单位<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </el-col>
        </el-row>
        <el-row class="content">
            <input type="text" value="张鑫，18502222545">
            <p>温馨提示</p>
            <input type="text" value="文本框内容">
        </el-row>
        <el-row class="add">
            <my-uploader v-for="(v, i) in arr" :key="i" :images="arr" :ind="i"></my-uploader>
        </el-row>
    </div>
</template>

<script>
import myUploader from '../../components/uploadPic.vue';
export default {
    name: 'message',
    data() {
        return {
            arr: [{hasDel: false}]
        };
    },
    components: {
        myUploader
    }
}
</script>

<style scoped lang="scss">
    .message{
        margin-top: 25px;
        width: 96%;
        height: auto;
        background: #fff;
        padding:0 2%;
        h2{
            line-height: 40px;
            font-size:18px;
            font-weight: 400;
        }
        span{
            display: inline-block;
            line-height: 38px;
            height: 38px;
        }
        .el-dropdown{
            float: right;
            background: #fff;
            .el-button{
                background: #fff;
                color:#000;
                border:0;
            }
        }
    }
    .content{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        p{
            line-height: 35px;
        }
        input{
            width: 100%;
            height: 35px;
            border-radius: 5px;
            padding-left:1%;
            border:1px solid #ccc;
        }
    }
        
</style>
