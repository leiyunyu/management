<template>
    <div class="divhh" v-loading="$store.state.loading">
        <div class="login">
            <input type="text" placeholder="username" v-model.trim="username"><br>
            <input type="password" placeholder="password" v-model.trim="password"><br>
            <button @click="go_to_register">注册</button>
            <button @click="go_to_login">登录</button>
        </div> 
    </div>
</template>

<script>
import {setCookie} from '../../utils/utils';
export default {
    name: 'myLogin',
    data () {
        return {
            username: '',
            password: '',
            loading: false
        }
    },
    methods: {
        go_to_login () {
            let query = this.$route.query.from || 'admin';
            this.$store.commit('watch', true);
            this.$http.post('/admin/loginUser', {
                username: this.username,
                password: this.password
            }).then(res => {
                console.log(res.data) 
                setTimeout(() => {
                    if(res.data.code == '1'){
                        setCookie('token', res.data.token); 
                        this.$store.commit('updata_username', this.username);
                        this.$router.push({name: query});
                    } else{
                        this.$alert(res.data.msg, '登录信息有误', {
                            confirmButtonText: '确定',
                            callback: active => {
                                this.username = '',
                                this.password = ''
                            }
                        });
                    }
                    this.$store.commit('watch', false);
                },2000)
            })
        },
        go_to_register () {
            this.$http.post('/admin/registerUser', {
                username: this.username,
                password: this.password
            }).then(res => {
                console.log(res);
            })
        }   
    }
}
</script>

<style scoped lang="scss">
.divhh{
    width: 100%;
    height: 100%;
}
    .login{
        width: 300px;
        height: auto;
        margin:0 auto;
        input{
            margin-bottom: 10px;
            width: 280px;
            height: 40px;
            padding-left:20px;
            border-radius: 8px;
            border:1px solid #ccc;
        }
        button{
            width: 300px;
            height: 40px;
            border:1px solid #ccc;
            border-radius: 8px;
            outline: 0;
            margin-bottom: 10px;
        }
    }
</style>
