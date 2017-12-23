<template>
    <div class="activeInfo">
        <div class="top">
            <h2>活动信息</h2>
            <p>活动地点：社区居委会活动室</p>
            <p>温馨提示：请携带有效证件前往，如身份证</p>
        </div>
        <div class="form">
            <h2>居民报名</h2>
            <p>
                <label for=""><span>姓名*</span><input type="text" value="文本框内容" v-model="name"></label>
                <label for=""><span>联系电话*</span><input type="text" value="文本框内容" v-model="tel"></label>
            </p>
            <p>
                <label for="" class="secend"><span>备注信息*</span><input type="text" value="文本框内容" v-model="info"></label>
            </p>
            <button class="btn" @click="pushName">报名</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'activeInfo',
    data () {
        return {
            count: 100,
            name: '',
            tel: '',
            info: ''
        };
    },
    methods: {
        pushName () {
            this.$http.post('/admin/goto', {
                "id": ++this.count,
                "name": this.name,
                "age": 37,
                "send": "已通知",
                "tel": this.tel,
                "sex": "男",
                "info": this.info,
                "time": new Date()
            }).then(res => {
                if(res.data=='success'){
                    this.$msgbox ({
                        message:'报名成功'
                    })
                } else {
                    this.$msgbox ({
                        message:'该用户已在名单中'
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .activeInfo{
        width: 100%;
        height: auto;
        background: #eee;
        padding:0;
        box-sizing: border-box;
    }
    .top{
        background: #fff;
        width: 100%;
        height: 140px;
        padding-left:20px;
        box-sizing: border-box;
        h2{
            line-height: 60px;
            font-size:18px;
            font-weight: 600;
        }
        p{
            font-weight: 400;
            font-size:16px;
            line-height: 30px;
        }
    }
    .form{
        width: 100%;
        height: 296px;
        background: #fff;
        margin-top: 15px;
        padding:0 20px;
        box-sizing: border-box;
        h2{
            line-height: 60px;
            font-size:18px;
            font-weight: 600;
        }
        p{
            display: flex;
            justify-content: space-between;
            height: 60px;
            margin-bottom: 10px;
            label{
                width: 48%;
                display: flex;
                flex-direction: column;
                input{
                    margin-top: 10px;
                    width: 100%;
                    height: 35px;
                    border:1px solid #ccc;
                    border-radius: 5px;
                    padding-left:10px;
                    outline: 0;
                    box-sizing: border-box;
                }
            }
                .secend{
                    width: 100%;
                }
        }
    }
    .btn{
        margin-top: 15px;
        width: 30%;
        margin-left: 35%;
        height: 40px;
        border:0;
        outline: 0;
        border-radius: 5px;
        color:#fff;
        background:#01b0b9;
    }
</style>
