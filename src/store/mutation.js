export default {
    updata_username (state, data) {
        state.username = data;
    },
    watch (state, data) {
        state.loading = data;
    },
    updata_menu (state, data) {
        state.menu = data;
    },
    updata_name (state, data) {
        state.name = data;
    },
    updata_user (state, data) {
        state.user = data;
    },
    upload_img (state, data) {
        state.imageUrl.push(data);
    }
}