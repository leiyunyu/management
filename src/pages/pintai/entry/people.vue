<template>
    <div class="people">
        <el-table :data="$store.state.user" style="width: 100%">
            <el-table-column prop="name" label="居民姓名" width="150">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" width="200">
            </el-table-column>
            <el-table-column prop="send" label="短信通知" width="210">
            </el-table-column>
            <el-table-column prop="info" label="备注信息" width="210">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">                 
                    <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
                </template>2238908399
            </el-table-column>
        </el-table>
        <div class="block">
            <span class="demonstration">显示总数</span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="100" style="width:500px">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getCookie } from "../../../utils/utils.js";
export default {
    name:'people',
    data () {
        return {
            page: 1,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
        }
    },
    methods: {
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(page) {
            this.$store.dispatch("updata_user", this.page);
            this.page = page;
            },
        deleteRow(row) {
            this.$http
                .post("/admin/deluser", { id: row, token: getCookie("token") })
                .then(res => {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                    console.log(res.data);
                    if (res.data == "jwt expired") {
                        this.$msgbox({
                        title: "信息",
                        message: res.data.message,
                        showCancelButton: true,
                        confirmButtonText: "重新登陆",
                        cancelButtonText: "取消",
                        beforeClose: (action, instance, done) => {
                            if (action === "confirm") {
                            this.$router.push({
                                name: "login",
                                query: {
                                from: this.$route.name
                                }
                            });
                            }
                            done();
                        }
                        });
                        this.$store.dispatch("updata_user", this.page);
                    } else if (res.data == "err") {
                        this.$message({
                        type: "info",
                        message: "没有权限"
                        });
                    } else if (res.data == "success") {
                        this.$message({
                        type: "info",
                        message: "删除成功"
                        });
                        this.$store.dispatch("updata_user", this.page);
                    }
                    })
                    .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                    });
                });
            }
    },
    created() {
        this.$store.dispatch("updata_user", 1);
    }
}
</script>

<style scoped lang="scss">
    .people{
        width: 100%;
        height: auto;
        background: #fff;
    }
    .block {
        line-height: 50px;
        .el-pagination {
            float: right;
            margin-top: 15px;
        }
    }
</style>
