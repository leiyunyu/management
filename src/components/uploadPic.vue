<template>
    <div class="upload">
        <p>
            <input type="text" placeholder="请输入栏目名称"> 
            <button>编辑</button><button @click="add_pic">添加栏目</button>
            <button v-if="this.hasDel" @click="delete_pic(inde)" class="del">删除</button><button @click="beforeLook(imageUrl)">预览</button>
        </p>
        <el-upload class="avatar-uploader" action="http://localhost:3333/admin/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>图片格式：jpg/png 图片大小：小于200K 建议尺寸：宽度大于800px</span>
        <div class="mark" v-if="flags">
            <div class="box">
                <img :src=imageUrl alt="">
            </div>
            <button @click="del">确认</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myUpload',
    props: ['images', 'ind'],
    data() {
        return {
            imageUrl: '',
            hasDel: this.images[1],
            inde: this.ind,
            flags: false
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            // // this.$store.commit('upload_img', 'http://localhost:3333/' + res.path);
            // this.imageUrl = 'http://localhost:3333/' + res.path;
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$store.commit('upload_img', this.imageUrl);
        },
        beforeAvatarUpload(file) {
            const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isPic) {
            this.$message.error('上传头像图片只能是 JPG 或PNG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isPic && isLt2M;
        },
        add_pic () {
            this.images.push({hasDel:true});
        },
        delete_pic (index) {
            console.log(this.images);
            console.log(this.inde)
            this.images.splice(index, 1)
        },
        beforeLook () {
            this.flags = true
        },
        del () {
            this.flags = false
        }
    }
}
</script>

<style scoped lang="scss">
.mark{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    .box{
        width: 80%;
        height: 80%;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin:auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    button{
        position: absolute;
        bottom: 0;
        right: 0;
        background: #01b0b9;
        width: 80px;
        height: 45px;
        color:#fff;
        outline: 0;
        border: 0;
    }
}
    .upload{
        width: 100%;
        height: auto;
        p{
            line-height: 50px;
            input{
                border:0;
            }
            button{
                border:0;
                background: #fff;
                outline: 0;
                padding:0 10px;
                color:#666;
                &:first-child{
                    color:#01b0b9;
                };
                 &:nth-child(2){
                    color:#01b0b9;
                }
                 &:last-child{
                    color:#f00;
                }
            }
            
        .del{
            color:#f00;
        }
        }
    }
    .avatar-uploader{
            border:1px solid #ccc;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 100%!important;
            height: 100px;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 150px;
            height: 150px;
            line-height: 150px;
            text-align: center;
        }
        .avatar {
            width: 150px;
            height: 150px;
            display: block;
        }
</style>
