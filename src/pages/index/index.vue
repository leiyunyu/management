<template>
    <el-container class="containers">
        <my-aside></my-aside>
        <my-main></my-main>
    </el-container>
</template>

<script>
import myAside from '../aside/aside.vue';
import myMain from '../main/main.vue'
export default {
    name: 'index',
    components: {
        myAside,
        myMain
    }
}
</script>

<style lang="scss" scoped>
    h1{
        color:#f00;
        span{
            color:#0f0;
        }
    }
    .containers{
        width: 100%;
        height: 100%;
    }
    
</style>
