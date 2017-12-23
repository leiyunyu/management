<template>
    <div class="activity">
        <h1>{{this.$store.state.name}}</h1>
    </div>
</template>

<script>
export default {
    name: 'activity',
    data () {
        return {
            name: ''
        };
    },
    created () {
        // if(){

        // }
        this.$store.commit('watch', true)
        this.$http.get('/admin/menu/public').then((res) => {
            this.$store.commit('updata_menu', res.data.data);
            this.$store.commit('watch', false);
        })
    }
};
</script>

<style scoped lang="scss">

</style>
