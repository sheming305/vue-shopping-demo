<template>
	<div class="header">
		<div class="my-header">
			<!-- 左侧图片 -->
			<div class="content">
				<div class="avatar">
					<img width="84" height="84" :src="seller.avatar">
				</div>
			</div>
			<!-- 右侧餐店具体说明 -->
			<div class="content-wrapper">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ seller.name }}</span>
				</div>

				<div class="description">
				{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>

				<div v-if="seller.supports" class="payList">
					<span class="icon" :class="ClassName[seller.supports[0].type]"></span>
					<span class="text">{{ seller.supports[0].description }}</span>
				</div>

				<div v-if="seller.supports" class="support-count" @click="showDetail">
					<span class="count">{{ seller.supports.length }}个</span>
					<i class=""> > </i>
				</div>
			</div>
		</div>
		<!-- 公告 -->
		<div class="footer" @click="showDetail">
			<span class="footer-title"></span>
			<span class="footer-text">
				{{ seller.bulletin }}
			</span>
			<span class="footer-align"> > </span>
		</div>
		<!-- 头部背景图片 -->
		<div class="background">
			<img width="100%" height="100%" :src="seller.avatar">
		</div>
		<!-- 浮层 -->
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<!-- 浮层具体内容 -->
				<div class="detali-wrapper clearfix">
					<div class="detail-main">
						<!-- 标题 -->
						<h1 class="detail-name">{{ seller.name }}</h1>
						<!-- 星星评分 -->
						<star :size="48" :score="seller.score"></star>
						<!-- 优惠信息 -->
						<div class="detail-discounts">
							<div class="title">优惠信息</div>
							<ul v-if="seller.supports" class="supports">
								<li class="supports-items" v-for="(item,index) in seller.supports">
									<span class="icon" :class="ClassName[seller.supports[index].type]"></span>
									<span class="text">{{ seller.supports[index].description }}</span>
								</li>
							</ul>
						</div>
						<!-- 商家公告 -->
						<div class="detail-notice">
							<div class="title">商家公告</div>
							<span class="notice-text">
								{{ seller.bulletin }}
							</span>
						</div>
					</div>	
				</div>
				<!-- 浮层关闭按钮 -->
				<div class="detail-close" @click="closeDetail">
					<span>x</span>
				</div>	
			</div>
		</transition>
	</div>
</template>

<script>
import Star from "@/components/star/star"
export default {	
  components: {
  	star:Star
  },
  props: {
  	seller: {
  		type: Object
  	}
  },
  data () {
    return {
    	detailShow: false
     }
    },
  created() {
  	this.ClassName = ['decrease','discount','guarantee','invoice','special']
  },
  methods: {
  	showDetail() {
  		this.detailShow = true
  	},
  	closeDetail() {
  		this.detailShow = false
  	}
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
	// @import "@/common/stylus/icon.styl";
.header
	background: rgba(7, 17, 27, 0.5)
	position: relative
	overflow: hidden
	.my-header
		width: 100%
		display: flex
		color: #fff
		align-items: center
		.content
			padding:24px 16px 18px 24px
			.avatar
				display: inline-block
				vertical-align:top
		.content-wrapper
			display: inline-block
			position: relative
			text-align: left
			flex: 1
			color: raba(255, 255, 255, 0.7)
			.title
				height:45px
				line-height:45px
				.name
					font-size: 1.6rem
					font-weight: bold
				.brand	
					display: inline-block
					vertical-align:middle
					padding: 0
					margin: 0
					width: 60px
					height: 36px
					background: url("../../common/images/brand@2x.png") no-repeat
			.description
				padding:5px 0
				font-size: 1.4rem		
				font-weight: normal
				color: raba(255, 255, 255, 0.9)
			.payList
				padding:3px 0
				font-size: 1.4rem	
				color: raba(255, 255, 255, 0.9)
				.icon
					display: inline-block
					width: 24px
					height: 24px
					vertical-align:middle
					&.decrease
						background: url("../../common/images/decrease_1@2x.png") no-repeat
					&.discount
						background: url("../../common/images/decrease_1@2x.png") no-repeat
					&.guarantee
						background: url("../../common/images/guarantee_1@2x.png") no-repeat
					&.invoice
						background: url("../../common/images/invoice_1@2x.png") no-repeat
					&.special
						background: url("../../common/images/special_1@2x.png") no-repeat
						
			.support-count
				position: absolute
				right: 12px
				bottom: 5px
				padding: 0 8px
				height: 24px
				line-htight: 24px
				border-radius: 14px
				background: rgba(0, 0, 0, 0.2)
				text-align: center
				.count
					font-size:1.4rem
					color: rgb(255, 255, 255)
	.footer
		height: 30px
		line-height: 30px
		background: rgba(7, 17, 27, 0.2)
		padding: 8px 10px
		white-space: nowrap
		// word-break:keep-all
		overflow: hidden
		text-overflow: ellipsis
		color:#fff
		.footer-text
			margin-left: 6px
			font-size: 1.2rem
			font-weight: 300
			color: rgb(255, 255, 255)
		.footer-align
			color: #fff
		.footer-title
			display: inline-block
			width: 44px
			height: 24px
			vertical-align:middle
			background: url("../../common/images/bulletin@2x.png") no-repeat	
	.background
		width:100%
		height: 100%
		position: absolute
		top: 0
		left: 0
		z-index: -1
		fliter: blur(10px)
	.detail
		position: fixed
		top: 0
		left: 0
		z-index: 100
		width: 100%
		height: 100%
		overflow: auto
		// backdrop-fliter: blur(10px)
		// 浮层动画效果
		&.fade-enter-active, &.fade-leave-active
			transition: all .5s linear	
			opcity: 1
		 	background: rgba(7, 17, 27, 1)
		&.fade-enter,&.fade-leave-to
			opcity: 0.5
			background: rgba(7, 17, 27, 0.5)
		.detali-wrapper
			height: 100%
			.detail-main
				margin-top: 64px
				padding-bottom: 64px 
				.detail-name
					width: 100%
					color: rgb(255, 255, 255)
					font-size: 1.8rem
					font-weight: 700
					line-height: 32px
					text-align: center
				.detail-discounts
					width: 100%
					box-sizing: border-box
					padding: 15px 20px
					.supports
						margin-top: 15px
						list-style: none
						.supports-items
							text-align: left
							margin-top: 15px
							.icon
								display: inline-block
								width: 24px
								height: 24px 
								vertical-align:middle
								&.decrease
									background: url("../../common/images/decrease_1@2x.png") no-repeat
								&.discount
									background: url("../../common/images/decrease_1@2x.png") no-repeat
								&.guarantee
									background: url("../../common/images/guarantee_1@2x.png") no-repeat
								&.invoice
									background: url("../../common/images/invoice_1@2x.png") no-repeat
								&.special
									background: url("../../common/images/special_1@2x.png") no-repeat
							.text
								display: inline-block
								color: #fff
								font-size: 1.6rem	
					.title
						text-align: center
						line-height: 28px
						font-size: 1.8rem
						font-weight: 700
						color: rgb(255, 255, 255)
				.detail-notice
					width: 100%
					box-sizing: border-box
					margin:	6px auto
					text-align: left
					padding: 15px 20px
					.title
						text-align: center
						line-height: 28px
						font-size: 1.8rem
						font-weight: 700
						color: rgb(255, 255, 255)
					.notice-text
						display: inline-block
						line-height: 28px
						margin-top: 15px
						color: rgb(255, 255, 255)
						font-size: 1.4rem
						font-weight: 300
						
		.detail-close
			position: fixed	
			bottom: 0
			width: 100%
			height: 35px
			line-height: 35px
			span
				display: inline-block
				color: rgba(255, 255, 255, 0.5)
				font-size: 2.6rem
				margin: 0 auto
					
</style>
