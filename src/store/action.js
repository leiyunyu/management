import axios from '../http/axios';
export default {
    updata_user( {commit }, pagesize ) {
        axios.post('/admin/user', {
            pageSize: pagesize,
            count: 10
        }).then((res) => {
            commit('updata_user', res.data);
        })
    }
}