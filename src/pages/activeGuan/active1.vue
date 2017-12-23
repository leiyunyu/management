<template>
    <div class="produ">
        <h2>基本信息<span>未发布</span></h2>
        <dl>
            <dt>
                <el-upload class="avatar-uploader" action="http://localhost:3333/admin/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>格式：jpg/png 大小：小于200K 尺寸：宽度大于800px</span>
            </dt>
            <dd>
                    <el-form label-width="80px">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="startData" style="width: 100%;"></el-date-picker>
                            </el-col>
                                <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="endData" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                     <el-form-item label="选择地区" class="areas">
                        <el-select v-model="form.privace" placeholder="请选择省" @change="changeProvice">
                            <el-option v-for="(val, index) in data" :key="index" :label="val.name" :value="val.name"></el-option>
                        </el-select>
                        <el-select v-model="form.city" placeholder="请选择楼市" @change="changeCity">
                            <el-option v-for="(val, index) in cityList" :key="index" :label="val.name" :value="val.name" ></el-option>
                        </el-select>
                        <el-select v-model="form.area" placeholder="请选择区" @change="changeArea">
                            <el-option v-for="(val, index) in areaList" :key="index" :label="val" :value="val"></el-option>
                        </el-select>
                        <el-select v-model="form.door" placeholder="请选择房号">
                            <el-option label="aaa" value="aaa"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-form>
            </dd>
        </dl>
        <el-row class="add">
            <my-uploader v-for="(v, i) in arr" :key="i" :images="arr" :ind="i"></my-uploader>
        </el-row>
        <button @click="save_publish" class="btn">保存并发布</button>
    </div>
</template>

<script>
import myUploader from '../../components/uploadPic.vue';
export default {
    name: 'myActive1',
     data() {
        return {
            imageUrl: [],
            arr: [{hasDel: false}],
            form: {
                name: '',
                privace: '',
                city: '',
                area: '',
                door: ''
            },
            startData: new Date(),
            endData: new Date('2017-12-8'),
            data: '',
            cityList: [],
            areaList: []
        };
    },
    components: {
        myUploader
    },
    methods: {
        changeProvice (val) {
            this.data.forEach((v, k) => {
                if(v.name == val){
                    this.cityList = v.city;
                }
            })
            this.form.city = '';
            this.form.area = '';
        },
        changeCity (val) {
            this.cityList.forEach((v, k) => {
                if(v.name == val){
                    this.areaList = v.area;
                }
            })
            this.form.area = '';
        },
        changeArea () {
            console.log()
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$store.commit('upload_img', this.imageUrl);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleCommand(command) {
            this.$message('click on item ' + command);
        },
        save_publish () {
            if(!this.form.name){
                this.$message('请填写活动名称');
                return;
            }
            if(!this.imageUrl){
                this.$message('请加入至少一张图片')
            }

            this.$http.post('/admin/activity/add', {
                categoryId:"活动类别id",
                name:this.form.name,
                imagePath:this.$store.state.imageUrl,
                startDate:this.startData,
                endDate:this.endData,
                locationId:"地点id",
                locationName:this.form.privace + this.form.city + this.form.area
            }).then(res => {
                if(res.data=='success'){
                    this.$message({
                        message:'发布成功'
                    })
                };
            })
        }
    },
    created () {
        let that = this;
        this.$http.get('/admin/community/location/root').then((res) => {
            that.data = res.data
        })
    }
}
</script>

<style scoped lang="scss">
.el-form-item__content{
    width: 100%;
    .el-select{
        width: 23%;
    }
}
    .produ{
        width: 100%;
        height: auto;
        h2{
            line-height: 30px;
            font-weight: 400;
            font-size:16px;
        }
        dl{
            width: 100%;
            height: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            dt{
                width:35%;
                height: 200px;
                .avatar-uploader{
                    width: 100%;
                    height: 170px;
                    border:1px solid #ccc;
                    line-height: 170px;
                    text-align: center;
                    font-size:30px;
                    img.avatar{
                        width: 100%;
                        height: 100%;
                    }
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 100%;
                    height: 150px;
                    line-height: 150px;
                    text-align: center;
                    
                }
                span{
                    line-height: 30px;
                    font-size:10px;
                }
            }
            dd{
                width: 65%;
                height: 200px;
                padding-left:15px;
            }
        }
    }
    .btn{
        width: 20%;
        height: 35px;
        background: skyblue;
        border:0;
        outline: 0;
        border-radius: 5px;
        color:#fff;
        margin-top: 10px;
        margin-left: 40%;
    }
</style>
