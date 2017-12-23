<template>
    <div class="active">
        <el-row>
            <p><span>邀请居民</span><button>添加居民</button>
            <el-button type="text" @click="open">短信通知</el-button></p>
        </el-row>
        <el-table v-loading="loading" ref="multipleTable" :data="$store.state.user" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="name" label="居民姓名" width="80">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" width="140">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="100">
            </el-table-column>
            <el-table-column prop="send" label="短信通知" width="130">
            </el-table-column>
            <el-table-column prop="info" label="备注信息" width="210">
            </el-table-column>
            <el-table-column
                label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="beizhu(scope.row.id)"type="text" size="small">备注</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>                    
                    <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
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
import { getCookie } from "../../utils/utils.js";
export default {
  name: "myActive2",
  data() {
    return {
      page: 1,
      tableData: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      loading: false,
      message: ""
    };
  },
  methods: {
    handleClick() {
      console.log(1);
    },
    beizhu(id) {
      this.$prompt("请输入备注内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$http.post("/admin/info", {
              id: id,
              info: value
            })
            .then(res => {
              if (res.data == "success") {
                this.$store.dispatch("updata_user", this.page);
                    this.$message({
                        type: "success",
                        message: "备注成功"
                    });
                }
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "取消输入"
            });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(page) {
      this.$store.dispatch("updata_user", this.page);
      this.page = page;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    },
    open() {
      this.$alert(
        '<p><span>居民信息</span><input type="text" placeholder="请输入用户姓名或手机号" class="alert_box1"></p>',
        "提示信息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true
        }
      )
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: ": " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  created() {
    this.$store.dispatch("updata_user", 1);
  }
};
</script>

<style lang="scss">
.active {
  p {
    width: 100%;
    line-height: 30px;
    span {
      font-size: 20px;
    }
    button {
      padding: 0 15px;
      border: 0;
      background: #fff;
    }
  }
}
.block {
  line-height: 50px;
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
}
.el-button {
  span {
    font-size: 14px !important;
    color: #333;
  }
}
.el-tabs_content {
  .el-table th {
    .cell {
      text-align: center;
    }
  }
  .el-table th {
    .cell {
      text-align: center;
    }
  }
}
.box_input2 {
  width: 100%;
}
.alert_box1 {
  width: 450px;
}
.el-message-box {
  width: 600px !important;
}
</style>
