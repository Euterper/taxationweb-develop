<template>
	<div>
        <Header headerName="新增私属人员"></Header>
		<div class="title">
            <div class="func-mt20">
                <div class="list func-bgfff">
                    <div class="func-flex func-bb1">
                        <div class="name func-br1">
                            <label class="func-iblock">姓名</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.name}}</h1> -->
                            <input type="text" class="func-iblock word" placeholder='请输入' v-model="formadd.employeeName">
                        </div>
                        <div class="photo photo2">
                           <!--  -->
                            <a href="javascript:;" class="file">  
                                <img class="photo1 " :src="formLineTwo.photo" alt="" v-if="imgList.length==0">
                                <img style="height: 85px;width: 85px;border-radius: 56px;"  :src="imgList[imgList.length-1].file.src" v-if="imgList.length>0">
                                <!-- <img class="del" src="@/assets/images/del.png" @click.stop="delImg(0)" v-if="imgList.length>0"> -->
                                <input type="file" id="upload_file"  accept="image/*"   @change="fileChange($event)"/>
                            </a>
                        </div>
                           
                    </div>
                    <div class="func-flex func-bb1">
                        <div class="name">
                            <label class="func-iblock">所属成员</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.team}}</h1> -->
                            <input type="text" class="func-iblock word" placeholder='请选择'  v-model="value4" @click="showPicker2 = true">
                             <!-- <input class="func-iblock word" placeholder="选择性别" v-model="value" /> -->
                                <van-popup v-model="showPicker2" position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="columns2"
                                    @cancel="showPicker2 = false"
                                    @confirm="onConfirm2"
                                />
                                </van-popup>
                        </div>
                    </div>
                </div>
                <div class="list func-bgfff func-mt20">
                    <div class="func-flex func-bb1">
                        <div class="name func-br1">
                            <label class="func-iblock">证件类型</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.type}}</h1> -->
                            <input class="func-iblock word" placeholder="选择证件类型" v-model="value1" @click="showPicker1 = true"/>
                            <van-popup v-model="showPicker1" position="bottom">
                            <van-picker
                                show-toolbar
                                :columns="columns1"
                                @cancel="showPicker1 = false"
                                @confirm="onConfirm1"
                            />
                            </van-popup>
                        </div>
                        <div class="name func-br1">
                            <label class="func-iblock">性别</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.six}}</h1> -->
                            <input class="func-iblock word" placeholder="选择性别" v-model="value" @click="showPicker = true"/>
                                <van-popup v-model="showPicker" position="bottom">
                                <van-picker
                                    show-toolbar
                                    :columns="columns"
                                    @cancel="showPicker = false"
                                    @confirm="onConfirm"
                                />
                                </van-popup>
                        </div>
                    </div>
                    <div class="func-flex func-bb1">
                        <div class="name">
                            <label class="func-iblock">证件号码</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.idcard}}</h1> -->
                            <input type="text" class="func-iblock word"  v-model="formadd.identityCard" placeholder='请输入'>
                        </div>
                    </div>
                    <div class="func-flex func-bb1">
                        <div class="name">
                            <label class="func-iblock">手机号码</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.phone}}</h1> -->
                            <input type="text" class="func-iblock word" v-model="formadd.employeePhone"  placeholder='请输入'>
                        </div>
                    </div>
                    <div class="func-flex func-bb1">
                        <div class="name">
                            <label class="func-iblock">受雇从业日期</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.date}}</h1> -->
                            <h1 class="func-iblock"  @click="timePicker = true">{{value3}}</h1>
                            <!-- <input placeholder="选择出单日期"/> -->
                            <van-popup v-model="timePicker" position="bottom">
                            <van-datetime-picker v-model="currentDate" type="date" @confirm="onConfirm3"  @change="endTimeChange" />
                            </van-popup>
                        </div>
                    </div>
                </div>
                <!-- <van-dialog id="van-dialog" /> -->
                <div class="list func-bgfff func-mt20">
                    <div class="func-flex func-bb1">
                        <div class="name func-br1">
                            <label class="func-iblock">备注</label>
                            <!-- <h1 class="func-iblock">{{formLineTwo.remark}}</h1> -->
                            <input type="text" class="func-iblock word"  v-model="formadd.remark"  placeholder='请输入'>
                        </div>
                    </div>
                </div>
                <!-- <div class="info_btn" > 
                        <span class="btn_sub" @click.stop="next1(item.billId,item.systemBillId)" >确认新增</span>
                 </div> -->
            <div class="bill-tabbar">
                <div class="tabbar-left" @click.stop="next1">确认新增</div>
            </div>
            </div>
		</div>
	</div>
</template>

<script>
	import { Dialog ,Toast ,Uploader } from 'vant';
    import Header from "@/components/Header.vue";
    import { METHODS } from 'http';
    import moment from "moment"   
    import {SaveBill,UploadImg,apiAddMan} from "@/api/example"


	export default {
		name: 'PersonInfo',
		components: {
			Header
		},
	  data() {
		return {
             formadd:{
              employeePhone:'',
              employeeName:'',
              employeeSex:'',
              entryDate:'',
              remark:'',
              identityCard:'',
              rela:'',
              imageUrl:'',
          },
            columns2:[],
            peopleList:[], //所属人的集合
            timePicker: false,
            date1:'',
            value3:'请选择日期',
            value4:'请选择',
            currentDate: new Date(),
            showPicker2:false,
           imgList: [],
           size: 0,
           limit:1, //限制图片上传的数量
          value1:'请选择证件类型',
          columns1: ['身份证'],
          showPicker1: false,
          columns: ['男', '女'],
          active: 2,
          value:'请选择性别',
          showPicker: false,
         
		  formLine:{
			 name:'张三(队长)',
			 team:'T0001',
			 date:'2019年2月10日',
			 type:'居民身份证',
			 six:'男',
			 idcard:'42377213128389',
			 bank:'中国工商银行广州分行',
			 bankaccount:'521371238129391',
			 phone:'13789290012'
		  },
		  formLineTwo:{
			   name:'张三(队长)',
			  team:'T0001',
			  date:'2019年2月10日',
			  type:'居民身份证',
			  six:'男',
			  idcard:'42377213128389',
			  remark:'无备注',
			  phone:'13789290012',
              photo:require('@/assets/images/man.png')

		  }
		};
      },
      mounted(){
			this.getapiAddMan();
		},
      methods:{
           // 返回布尔值
                beforeRead(file) {
                if (file.type !== 'image/jpeg') {
                    Toast('请上传 jpg 格式图片');
                    return false;
                }
                
                return true;
                },

                // 返回 Promise
                asyncBeforeRead(file) {
                return new Promise((resolve, reject) => {
                    if (file.type !== 'image/jpeg') {
                    Toast('请上传 jpg 格式图片');
                    reject();
                    } else {
                    resolve();
                    }
                });
                },
            next1(){
                console.log(this.formadd,'提交上传信息的数据===========');
                let param = this.formadd;
                
                SaveBill(param).then(resp =>{
                    console.log(resp,'resp============================')
                    if(resp.code==1){
                       this.$router.push({
                            name:'PersonInfo'
                        })
                    }else{
                         Toast.fail(resp.message);
                    }
                })

            },
          /**
			 * @param arr 查找数组
			 * @param property 查找属性
			 * @param value 查找值
			 * @des:查找到值后返回其值
			 */
			findArrayReturnValue(arr,property,value,findKey){
				let len,
					findValue;
				if(!Array.isArray(arr)){
					return;
				}
				len = arr.length;
				for (var i = 0; i<len; i++){
					if(arr[i].hasOwnProperty(property) && arr[i][property] == value && arr[i].hasOwnProperty(findKey)){
						findValue = arr[i][findKey];
						break;
					}
				}
				return findValue;
            },
            onConfirm2(value) {
			  this.value4 = value;
			  console.log(this.value4 ,'this.value 所属成员====================');
			 //   this.companyidList
			   let rela =this.findArrayReturnValue(this.peopleList, "employeeName", value, "employeeId");
			   this.formadd.rela = rela;
               console.log(rela,'99999999999999999这就是rela===========');
			   this.showPicker2 = false;
			},
            	//    本单业务员
			getapiAddMan(){
						apiAddMan().then((resp) =>{
							console.log(resp,' // //3.2.11.（新建结算单）获取所有正式员工信息（本单业务员选择）====================')
                            this.peopleList = resp.data;
                            this.columns2 = this.peopleList.map(function (item,index,input) {
							     return item.employeeName;
                            })
                            
							console.log(this.columns2,'所有所属成员选择')
						})
			},
           endTimeChange(e) {
                let endTimeArr = e.getValues();//["2019", "03", "22", "17", "28"]
                this.date1 = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  `
                console.log(this.date1,'this.date')
        },
          Change(){
            console.log(this.currentDate);
            var date = this.currentDate;
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.currentdate =
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate +
                    " " +
                    "00" +
                    seperator2 +
                    "00" +
                    seperator2 +
                    "00";
            },
          onConfirm3(value) {
              	this.value3 =moment(value).format("YYYY-MM-DD");
            //    let endTimeArr = value.getValues();//["2019", "03", "22", "17", "28"]
            //  this.value3 = this.date1
            //   this.value3 = value;  
                this.formadd.entryDate = this.value3;
			    this.timePicker = false;
			},
			
			formatter(type, value) {
			  if (type === 'year') {
				return `${value}年`;
			  } else if (type === 'month') {
				return `${value}月`
			  }
			  return value;
			},
          appear(){
              Toast.fail('更改头像请先点击删除再上传');
            //   debugger;
          },
          onConfirm(value) {
			  this.value = value;
              this.showPicker = false;
              if(this.value=='男'){
                 this.formadd.employeeSex = '1';
              }else{
                   this.formadd.employeeSex = '0';    
              }
             
              console.log(this.formadd.employeeSex,'this.formadd.employeeSex==========')
              
            },
            onConfirm1(value) {
			  this.value1 = value;
              this.showPicker1 = false;
            },
            //////////////////////
            fileChange(el) {
                // console.log(this.imgList.length,'this.imgList.length');
                // if(this.imgList.length>0){
                //     Dialog.alert({
                //     // className:"dialog",
                //     title: '提示',
                //     message: '只能上传一张头像，可以删除本张图片后再上传'
                //     }).then(() => { return});
                //     return
                // }else{
                    if (!el.target.files[0].size) return;
                        this.fileList(el.target);
                        el.target.value = ''
                // }
                
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                //判断是否为文件夹
                if (files[i].type != '') {
                this.fileAdd(files[i]);
                } else {
                //文件夹处理
                this.folders(fileList.items[i]);
                }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                for (let i = 0; i < file.length; i++) {
                if (file[i].isFile) {
                _this.foldersAdd(file[i]);
                } else {
                _this.folders(file[i]);
                }
                }
                });
            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                // if (this.limit !== undefined) this.limit--;
                // if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
                this.$dialog.toast({mes: '请选择图片文件'});
                } else {
                    let reader = new FileReader();
                    let image = new Image();
                    let _this = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                    file.src = this.result;
                    image.onload = function(){
                        let width = image.width;
                        let height = image.height;
                        file.width = width;
                        file.height = height;
                        _this.imgList.push({
                                file  
                            });
                        // _this.imgList.splice(0,0,file);
                        // _this.imgList[0].file=file;
                        // let parm ={};
                        let param = new FormData() // 创建form对象
		                param.append('file', file) // 通过append向form对象添加数据
                        // parm.file= file;
                        UploadImg(param).then(resp=>{
                            // let that = this;
                             console.log(resp,'==================上传图片返回的数据===========================');
                             let imageUrl = resp.data[0].imageUrl;
                             _this.formadd.imageUrl = imageUrl;
                             console.log( _this.formadd.imageUrl,' _this.formadd.imageUrl========================');
                        })
                        console.log( _this.imgList,'imgList=======================99999999999999999');
                    };
                image.src= file.src;
                }
                }
            },
                delImg(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
                if (this.limit !== undefined) this.limit = 6-this.imgList.length;
                console.log(this.imgList,'pp')
            },
                        /////////////////////
                }
	}
</script>

<style scoped lang="scss">
	.title{
		margin-top: 90px;
	}
	.van-tabs--line .van-tabs__wrap{height: 84px;}
	.van-tab span{line-height: 84px;font-size: 30px;}
	.func-mt20{margin-top: 20px;}
	.func-iblock{display: inline-block;vertical-align: top;}
	.func-bgfff{background: #FFFFFF;}
	.func-flex{display: flex;}
	.func-bb1{border-bottom: 1px solid #ebebeb;}
	.func-br1{border-right: 1px solid #ebebeb;}
	.name,.photo{flex:1;padding:30px;}
	.name label{font-size: 26px;color: #9E9E9E;width: 100%;line-height: 40px;}
	.name h1{width: 100%;font-size: 32px;font-weight:bold;color: black;line-height: 60px;}
    .photo1{width: 90px;margin-left: 100px;}
    .photo2{margin-left: 10px}
    .word{font-size: 34px;font-weight: bold;width: 320px;}

    .info_btn{
            height:90px;
            margin-top: 20px;

            // padding:40px 0px 24px 40px;
            span{
                height:44px;
                color:#fff;
                font-weight:bold;
                font-size:46px;
                border-radius:22px;
                display:inline-block;
                line-height:90px;
                text-align:center;
            }
            .btn_del{
                background:#f3a4ba;
                width:93px;
                margin-left:10px;
            }
            .btn_edit{
                background:#2e3564;
                width:93px;
                margin-left:40px;
            }
            .btn_sub{
                background:#2e3564;
                width:100%;
                height: 90px;
                // margin-left:40px;
            }
            .btn_width{
                width:162px;
                margin-right:10px;
            }
        }

    .file {
    position: relative;
    display: inline-block;
    /* background: rgb(241, 241, 241); */
    /* // border: 1px solid #99D3F5; */
    border-radius: 4px;
    /* padding: 33px 26px; */
    overflow: hidden;
    color: white;
    text-decoration: none;
    text-indent: 0;
    /* padding-bottom: 37px; */
    font-size: 54px;
    line-height: 22px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        /* background: #AADFFD; */
        /* border-color: #78C3F3; */
        color: #004974;
        text-decoration: none;
    }
    .del {
    position: absolute;
    width: 40px; 
    top: 14px;
    right: 0;
    z-index: 999
    }
   .bill-tabbar{
		width: 100%;display: flex;
		.tabbar-left,
		.tabbar-right{flex: 1;color:#FAFAFA;line-height: 100px;text-align: center;}
		.tabbar-left{background: #D02602;}
		.tabbar-right{background: #A4A4A4;}
	}

</style>
