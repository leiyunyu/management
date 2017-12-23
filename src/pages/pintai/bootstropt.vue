<template>
    <h2>网格式管理</h2>
</template>

<script>
export default {
    name: 'myBootstropt',
    created () {
        this.$store.commit('watch', true)
        this.$http.get('admin/menu/grid').then((res) => {
            this.$store.commit('updata_menu', res.data.data);
            this.$store.commit('watch', false);
        })
    }
}
</script>

<style>

</style>
