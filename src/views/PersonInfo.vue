<template>
	<div>
        <Header headerName="个人信息"></Header>
		<div class="title">
			<van-tabs v-model="active" color="#313450" line-height="3px">
				<van-tab title="基础信息">
					<div class="func-mt20">
						<div class="list func-bgfff">
							<div class="func-flex func-bb1">
								<div class="name func-br1">
									<label class="func-iblock">姓名</label>
									<h1 class="func-iblock">{{formLine.name}}</h1>
								</div>
								<div class="photo">{{formLine.photo}}</div>
							</div>
							<div class="func-flex func-bb1">
								<div class="name">
									<label class="func-iblock">所属团队</label>
									<h1 class="func-iblock">{{formLine.team}}</h1>
								</div>
							</div>
							<div class="func-flex func-bb1">
								<div class="name">
									<label class="func-iblock">受雇从业日期</label>
									<h1 class="func-iblock">{{formLine.date}}</h1>
								</div>
							</div>
						</div>
						<div class="list func-bgfff func-mt20">
							<div class="func-flex func-bb1">
								<div class="name func-br1">
									<label class="func-iblock">证件类型</label>
									<h1 class="func-iblock">{{formLine.type}}</h1>
								</div>
								<div class="name func-br1">
									<label class="func-iblock">性别</label>
									<h1 class="func-iblock">{{formLine.six==0?'女':'男'}}</h1>
								</div>
							</div>
							<div class="func-flex func-bb1">
								<div class="name">
									<label class="func-iblock">证件号码</label>
									<h1 class="func-iblock">{{formLine.idcard}}</h1>
								</div>
							</div>
						</div>
						<div class="list func-bgfff func-mt20">
							<div class="func-flex func-bb1">
								<div class="name func-br1">
									<label class="func-iblock">开户银行</label>
									<h1 class="func-iblock">{{formLine.bank}}</h1>
								</div>
							</div>
							<div class="func-flex func-bb1">
								<div class="name func-br1">
									<label class="func-iblock">银行账户</label>
									<h1 class="func-iblock">{{formLine.bankaccount}}</h1>
								</div>
							</div>
							<div class="func-flex func-bb1 padb">
								<div class="name">
									<label class="func-iblock">手机号码</label>
									<h1 class="func-iblock">{{formLine.phone}}</h1>
								</div>
							</div>
						</div>

					</div>
				</van-tab>
				<van-tab title="私属成员">
					<div class="func-mt20">
						<van-swipe-cell v-for="(items, index) in row" :key="items.index"  :on-close="onClose">
							<div class="columList">
								<div class="chooseList-item func-mt20" >
									<div class="chooseList func-bgfff">
										 <div class="nav-head"><img src="../assets/images/man.png"/></div>
										 <div class="choose-name">{{items.employeeName}}</div>
										 <div class="choose-name">{{items.employeeId}}</div>
									</div>
								</div>
							</div>
							 <template slot="right">
								 <img class="choose-delete func-iblock" @click="deley(items.employeeId)"  src="../assets/images/delete.png"/>
							</template>
						</van-swipe-cell>
						<!-- <van-swipe-cell  :on-close="onClose">
							<div class="columList">
								<div class="chooseList-item func-mt20" v-for="(items, index) in listOne" :key="items.index">
									<div class="chooseList func-bgfff">
										 <div class="nav-head"><img src="../assets/images/man.png"/></div>
										 <div class="choose-name">{{items.name}}</div>
										 <div class="choose-name">{{items.size}}</div>
									</div>
								</div>
							</div>
							 <template slot="right">
								 <img class="choose-delete func-iblock" src="../assets/images/delete.png"/>
							</template>
						</van-swipe-cell> -->
						<!-- <van-swipe-cell  :on-close="onClose">
							<div class="columList">
								<div class="chooseList-item func-mt20" v-for="(items, index) in listOne" :key="items.index">
									<div class="chooseList func-bgfff">
										 <div class="nav-head"><img src="../assets/images/man.png"/></div>
										 <div class="choose-name">{{items.name}}</div>
										 <div class="choose-name">{{items.size}}</div>
									</div>
								</div>
							</div>
							 <template slot="right">
								 <img class="choose-delete func-iblock" src="../assets/images/delete.png" @click=""/>
							</template>
						</van-swipe-cell> -->
						<div class="addIcon" @click="addme">
							<img class="func-iblock" src="../assets/images/add.png"/>
						</div>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div class="bill-tabbar">
                <div class="tabbar-left" @click.stop="delMan">注销退出</div>
        </div>
	</div>
</template>

<script>
    import {setToken,getToken,KEYS,setOpenid, getOpenid,removeToken} from "@/service/config"
    import {apiDelNew,apiGetnews,apiGetMan,apiZhuXiao} from "@/api/example"
    import Cookies from "js-cookie";
	import Vue from 'vue';
	import { Dialog ,Toast } from 'vant';
    import Header from "@/components/Header.vue";
	export default {
		name: 'PersonInfo',
		components: {
			Header
		},
		data() {
			return {
				row:[],
				active: 2,
				listOne:[
					{
						size:'B109',
						index:0,
						checked:false,
						name:'张三'
					}
				],
				// formLine:{
				// 	 name:'张三(队长)',
				// 	 team:'T0001',
				// 	 date:'2019年2月10日',
				// 	 type:'居民身份证',
				// 	 six:'男',
				// 	 idcard:'42377213128389',
				// 	 bank:'中国工商银行广州分行',
				// 	 bankaccount:'521371238129391',
				// 	 phone:'13789290012'
				//   },
				formLine:{
					name:Cookies.get('ownName'),
					team:Cookies.get('teamName'),
					date:Cookies.get('entryDate'),
					six:Cookies.get('employeeSex'),
					idcard:Cookies.get('identityCard'),
					bank:Cookies.get('bankName'),
					bankaccount:Cookies.get('bankCard'),
					// phone:Cookies.get('employeePhone'),
					phone:Cookies.get('employeePhone'),
					type:'居民身份证',
				// ==============================================================================
					//  name:this.$store.state.ownName,
					//  team:this.$store.state.teamName,
					//  date: this.$store.state.entryDate,
					//  type:'居民身份证',
					//  six:this.$store.state.employeeSex,
					//  idcard:this.$store.state.identityCard,
					//  bank:this.$store.state.bankName,
					//  bankaccount:this.$store.state.bankCard,
					//  phone:this.$store.state.employeePhone
                // ================================================================================================
					//  this.$store.state.teamName= data.teamName;          // 所属团队名字
                    //     this.$store.state.entryDate= data.entryDate;        // 日期
                    //     this.$store.state.employeeSex= data.employeeSex;    // 性别
                    //     this.$store.state.employeePhone= data.employeePhone;  // 手机号码
                    //     this.$store.state.bankCard= data.bankInfo.bankCard; // 银行卡号
                    //     this.$store.state.bankName= data.bankInfo.bankName; // 开户银行
                    //     this.$store.state.identityCard= data.identityCard; // 身份证号码
				  },
				formLineTwo:{
					name:'张三(队长)',
					team:'T0001',
					date:'2019年2月10日',
					type:'居民身份证',
					six:'男',
					idcard:'42377213128389',
					remark:'无备注',
					phone:'13789290012'
				}
			}
		},
		mounted () {
			this.getapiGetnews();
			console.log(Cookies.get('employeePhone'),'Cookies.get(employeePhone),===========');
			console.log(Cookies.get('identityCard'),'Cookies.get(identityCard),===========');
			console.log(Cookies.get('bankCard'),'Cookies.get(bankCard),登录login打印的信息=============');
		},
		methods: {
			  delMan(){
					apiZhuXiao().then(resp=>{
						if(resp.code==1){
							Toast.fail('注销成功');
							removeToken();
							this.$router.push({
							    name:'Login'
							})
						}
					})
				},
			  getapiGetnews(){
                    let parmer ={
						// employeeId:this.$store.state.employeeId,
						employeeId:Cookies.get('employeeId'),
                    };
                    console.log(parmer,'parmer=================')
                    apiGetnews(parmer).then((resp) =>{
                        console.log(resp,'3.2.7.3.2.5.获取私属员工信息====================')
                        if(resp.code==1){
                            this.row = resp.data
                        }
                    })
				},
				getapiDelNew(id){
                    let parmer ={
                        employeeId:id,
                    };
                    console.log(parmer,'parmer=================')
                    apiDelNew(parmer).then((resp) =>{
                        console.log(resp,'3.2.7.3.2.5.删除私属员工信息====================')
					    this.getapiGetnews();
					   // if(resp.code==1){
                        //     this.row = resp.data
                        // }
                    })
				},
			deley(id){
				console.log(id,'ididid================')
				  Dialog.confirm({
						message: '确定删除吗？'
					  }).then(() => {
						  console.log(id,'点击删除闯进来的id===================');
						  this.getapiDelNew(id)
					  });
			},
			onClose(clickPosition, instance) {
				switch (clickPosition) {
					case 'left':
					case 'cell':
					case 'outside':
					  instance.close();
					  break;
					// case 'right':
					//   Dialog.confirm({
					// 	message: '确定删除吗？'
					//   }).then(() => {
					// 	  console.log(id,'点击删除闯进来的id===================');
					// 	instance.close();
					//   });
					  break;
				}
			},
			addme(){
				this.$router.push('/Addme');
			}
		}
	}
</script>

<style scoped lang="scss">
	/* .my-icon-extra::before {
	  content: '\e626';
	} */
	/*基础样式*/
	.padb{padding-bottom: 102px;}
	.bill-tabbar{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;display: flex;
		.tabbar-left,
		.tabbar-right{flex: 1;color:#FAFAFA;line-height: 100px;text-align: center;}
		.tabbar-left{background: #D02602;}
		.tabbar-right{background: #A4A4A4;}
	}
	.func-mt20{margin-top: 20px;}
	.func-iblock{display: inline-block;vertical-align: top;}
	.func-bgfff{background: #FFFFFF;}
	.func-flex{display: flex;}
	.func-bb1{border-bottom: 1px solid #ebebeb;}
	.func-br1{border-right: 1px solid #ebebeb;}
	.title{
		margin-top: 200px;
		.list{
			.name,.photo{flex:1;padding:30px;}
			.name{
				label{font-size: 26px;color: #9E9E9E;width: 100%;line-height: 40px;}
				 h1{width: 100%;font-size: 32px;font-weight:bold;color: black;line-height: 60px;}
			}
		}
		.columList{
			width:90%;margin-left:5%;
			.chooseList-item{
				display: flex;
				.chooseList{
					width:500px;
					border-radius: 70px;
					padding-left: 30px;
					font-size: 0px;margin-left:40px;display: flex;justify-content: center;align-items: center;
					.nav-head{flex:1;}
					.choose-name,.choose-size{flex:4;line-height: 100px;font-weight:bold;font-size: 24px;text-align: left;}
					.choose-name{width: 100px;color: #1C203E;padding-left:30px;}
					.choose-size{width: 100px;color: #E52300;text-decoration:underline;}
				}
			}
		}
		.choose-delete{width:50px;height:50px;margin-top: 20px;}
		.addIcon{
			width: 100%;text-align: center;margin-top: 40px;
			img{width: 80px;height: 80px;}
		}
	}
</style>
