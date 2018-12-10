<template>
	<div class="box">
		<div>
			<mt-header fixed title="个人中心">
				<router-link to="/" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<mt-button icon="more" slot="right"></mt-button>
			</mt-header>
		</div>
		<div class="container">
			<img :src="images">
			<h4>ID:2222222</h4>
			<h2>13528653655</h2>
		</div>
		<div>
		<mt-tabbar v-model="selected" fixed="fixed" style="background: #fff">
			<mt-tab-item id="首页" @click="one">
				<img slot="icon" src="../assets/images/wxb主页.png" v-if="showa">
				<img slot="icon" src="../assets/images/img2.png" v-else>
				首页
			</mt-tab-item>
			<mt-tab-item id="报表" @click="two">
				<img slot="icon" src="../assets/images/search.png" v-if="showb">
				<img slot="icon" src="../assets/images/search1.png" v-else>
				报表
			</mt-tab-item>
			<mt-tab-item id="我的" @click="three">
				<img slot="icon" src="../assets/images/iconfont-mingpian.png" v-if="showc">
				<img slot="icon" src="../assets/images/wxb账户.png" v-else>
				我的
			</mt-tab-item>
		</mt-tabbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="首页">
		    <mt-cell v-for="n in 10" :title="'内容 ' + n" />
		  </mt-tab-container-item>
		  <mt-tab-container-item id="报表">
		    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
		  </mt-tab-container-item>
		  <mt-tab-container-item id="我的">
		    <ul>
		    	<li v-for="item in proList">
			    	<div class="list">
			    		<div>
					    	<img style="width:26px;vertical-align: middle" :src="item.img">
					    	<span style="padding-left: 15px">{{item.titie}}</span>
				    	</div>
				    	<div style="flex:1;text-align:right;">
				    		<img style="height:15px" :to="{ path: item.path }" src="../assets/images/arrow-right.png">
				    	</div>
			    	</div>
		    	</li>
		    </ul>
		  </mt-tab-container-item>
		</mt-tab-container>
		</div>
	</div>
</template>

<script>	
export default {
	data () {
		return {
			fixed: true,
			showa:false,
			
			showb:true,
			
			showc:true,
			
			selected:"首页",
			images: require("@/assets/images/jsyh.png"),
			proList:[
				{	
					img: require("../assets/images/特色服务.png"),
					titie:"购买代理",
					path:"one"
					// icon:require("../assets/images/arrow-right.png")
				},
				{
					img: require("../assets/images/设置用.png"),
					titie:"推荐有钱",
					path:"two"
					// icon:require("../assets/images/arrow-right.png")
				},
				{
					img: require("../assets/images/安全规则用.png"),
					titie:"新手必读",
					path:"three"
					// icon:require("../assets/images/arrow-right.png")
				},
				{
					img: require("../assets/images/计划书用.png"),
					titie:"联系客服",
					path:"four"
					// icon:require("../assets/images/arrow-right.png")
				},
				{
					img: require("../assets/images/银行用.png"),
					titie:"意见反馈",
					path:"five"
					// icon: require("../assets/images/arrow-right.png")
				}
			]
		}
	},
	methods: {
		one() {
			console.log("111")
			this.showa = false
			this.showb = true
			this.showc = true
		},
		two() {
			this.showa = true
			this.showb = false
			this.showc = true
		},
		three() {
			this.showa = true
			this.showb = true
			this.showc = false
		}
	}
}
</script>

<style scoped lang="scss">
    .container{
		margin-top:-20px;
    	width: 100%;
    	background: #26a2ff;
    	img{
    		width:80px;

    	}
    	h4,h2{
			color:#fff;
			font-weight: 300;
    	}
    }
    .box ul{
		background:#EFF2F9;list-style: none;padding:0;width:100%;text-align: center;padding:0 6px;box-sizing: border-box;
		li{
			padding:0 15px;background:#fff;border-radius: 10px;margin-top:10px;
			.list{
				height:55px;line-height: 55px;display: flex;align-items: center
			}
		}
	}
</style>
