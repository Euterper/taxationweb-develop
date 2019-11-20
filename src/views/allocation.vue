<template>
	<div>
		<Header headerName="分配调整"></Header>
		<div class="func-mt120">
			<div class="revisionList">
				<div class="revision-title">
					<ul class="func-flex">
						<li class="title-li func-iblock" v-for="(item, index) in revisionList" :key="item.index">{{item.name}}</li>
					</ul>
				</div>
				<div class="revision-nav">
					<ul>
						<li class="revision-li" @click="Revischange(index)" v-for="(item, index) in tiaozhengList" :key="item.index">
						<!-- <li class="revision-li" @click="Revischange(index)" v-for="(item, index) in revisionListTwo" :key="item.index"> -->
							<!-- <div class="nav-checkbox func-iblock"><van-checkbox class="Js-checkbox" shape="square" v-model="item.checked" checked-color="#1C203E"></van-checkbox></div> -->
							<div :class="revisstatus==index?'revisionLi func-mt20 f-left liActive':'revisionLi func-mt20 f-left'">
								<div class="nav-name">{{item.employeeName}}</div>
									<div class="nav-input"><input class="input-amount func-D02602" type="number" v-model="item.memberMoney"/></div>
							</div>	
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="bill-tabbar" @click="tiaozheng">调整</div>
	</div>
</template>

<script>
	 import Header from "@/components/Header.vue";
	 import {apiEditMan} from "@/api/example"

	export default {
		name: 'PersonInfo',
		components: {
			Header
		},
		data() {
			return {
				tiaozhengList:[],
				systemBillId:'',
				revisstatus:0,
				list:[
					{
						index:0,
						checked:false,
						name:'张三'
					},
					{
						index:1,
						checked:false,
						name:'李四'
					},
					{
						index:2,
						checked:false,
						name:'王五'
					},
					{
						index:3,
						checked:false,
						name:'赵六'
					}
				],
				revisionList:[
					{
						index:1,
						name:'人员'
					},
					{
						index:2,
						name:'输入分配金额'
					}
				],
				revisionListTwo:[
					{
						index:0,
						name:'张三',
						vl1:'2000',
						vl2:'2000',
						vl3:'2000',
						vl4:'2000',
						vl5:'2000'
					},
					{
						index:1,
						name:'李四',
						vl1:'2000',
						vl2:'2000',
						vl3:'2000',
						vl4:'2000',
						vl5:'2000'
					},
					{
						index:2,
						name:'张三',
						vl1:'2000',
						vl2:'2000',
						vl3:'2000',
						vl4:'2000',
						vl5:'2000'
					},
					{
						index:3,
						name:'李四',
						vl1:'2000',
						vl2:'2000',
						vl3:'2000',
						vl4:'2000',
						vl5:'2000'
					}
				],
			}
		},
		mounted(){
			this.systemBillId = this.$route.params.id;
			console.log(this.systemBillId,'this.systemBillId==================');
			this.tiaozhengList  = this.$store.state.tiaozhengList ;
			console.log(this.tiaozhengList,'this.tiaozhengList============9999')
		},
		  beforeRouteLeave(to, from, next) {
			   // 设置下一个路由的 meta
				to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
				next();
		   
		 },
		methods:{
			tiaozheng(){
				console.log(this.tiaozhengList,'this.tiaozhengList修改后的================');
				let hommyList = this.tiaozhengList; 
				let arrList = hommyList.map(function (item,index,input) {
									let son ={};
									son.isMaster = item.isMaster;
									son.employeeId = item.employeeId;
									son.memberMoney = item.memberMoney;
									return son
								})
				console.log(this.tiaozhengList,'this.tiaozhengList MAP修改后的================');
                this.$store.state.workerList = arrList;
				console.log(arrList,'处理后的数组arrList=================================================');
				let parmers = {};
				parmers.systemBillId = this.systemBillId;
				parmers.employees = arrList;
				apiEditMan(parmers).then((resp) =>{
						console.log(resp,' 3.2.14.（新建结算单）调整结算单分配====================');
						if(resp.code == 1){
							this.$router.go(-1)
						}else{
							console.log(resp.message)
						}
				});
			},
			Revischange(index){
				console.log("index:",index)
				this.revisstatus =index;
			},
		}
	}
</script>

<style scoped lang="scss">
	/*基础样式*/
	.f-left{    margin-left: 12%;}
	.func-D02602{color:#D02602 !important;}
	.func-bold{font-weight: bold;}
	.font-1C203E{color: #1C203E !important;}
	.func-mt120{margin-top: 120px;}
	.func-mt20{margin-top: 20px;}
	.func-iblock{display: inline-block;vertical-align: middle;}
	.func-bgfff{background: #FFFFFF;}
	.func-flex{display: flex;}
	.func-bb1{border-bottom: 1px solid #ebebeb;}
	.func-br1{border-right: 1px solid #ebebeb;}
	.width100{width: 90%;margin-left: 5%;}
	.liActive{background: #FFFFFF !important;}
	/*基础样式*/
	.revisionList{
		width:97%;
		margin-left:2%;
		.revision-title ul{
			width: 60%;
			margin-left:20%;
			.title-li{
				font-size: 30px;
				line-height: 80px;
			}
		}
		.revision-nav{
			.revision-li{
				.nav-checkbox{
					width:15%;
					text-align: center;
					margin-left: 10%;
					.Js-checkbox{
						margin:20px 30px;
					}
				}
				.revisionLi{
					width: 80%;
					border-radius: 70px;
					text-align: center;
					background:#DFE3EB;
					font-size: 30px;
					color:#1C203E;
					line-height: 100px;
					display: inline-block;
					vertical-align: middle;
					overflow: hidden;
					.nav-name{width:50%;float: left;}
					.nav-input{
						width:50%;float: left;
						text-align: center;
						.input-amount{
							width:50%;
						}
					}
				}
			}
		}
		
	}
	.bill-tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #1C203E;
		color:#FAFAFA;
		text-align: center;
		line-height: 100px;
		font-size: 20px;
	}
	.revision-title ul li{flex: 1;text-align: center;font-size: 16px;color:#1C203E;line-height: 70px;}
	
</style>
