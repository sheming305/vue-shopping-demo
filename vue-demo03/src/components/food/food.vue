<template>
	<!-- 商品详情页 -->
	<transition name="trans">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<!-- 图片 -->
				<div class=img-header>
					<img :src="food.image">
					<!-- 返回箭头 -->
					<div class="back" @click="backTO">
						<i class="icon-arrow-left2"></i>
					</div>
				</div>
				<!-- 商品详细 -->
				<div class="content">
					<h1 class="title">{{ food.name }}</h1>	
					<div class="detail">
						<span class="xsqk">月售{{ food.sellCount }}份</span>
						<span class="hpl">好评率{{ food.rating }}%</span>
					</div>
				</div>
				<div class="price">
					<div class="myPrice">
						<span class="newPrice">￥{{ food.price }}</span>
						<span class="oldPrice" v-show="food.oldPrice">
							￥{{ food.oldPrice }}
						</span>
					</div>
					
					<div class="cartWrapper">
						<cartcontrol :food="food"></cartcontrol> 
					</div>
					<!-- 加入购物车按钮 -->
					<transition name="shop">
						<mt-button @click="addFirst($event)" v-show="!food.count || food.count === 0" class="button" type="primary">加入购物车
						</mt-button>
					</transition>
				</div>
				<!-- 分割模板 -->
				<split v-show="food.info"></split>
				<!-- 商品介绍 -->
				<div class="info" v-show="food.info">
					<div class="info-title">商品介绍</div>
					<p class="info-text">{{food.info}}</p>
				</div>
				<!-- 分割模板 -->
				<split></split>	
				<!-- 评价 -->
				<div class="rating">
					<div class="rating-title">商品评价</div>
					<!-- 引入评价组件 -->
					<rating :select-type="selectType" :only-content="onlyContent" 
					:desc="desc" :ratings="food.ratings"></rating>
					<!-- 具体用户所有类型评价详情内容 -->
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li 
							v-for="rating in food.ratings" 
							class="rating-item"
							v-show="needShow(rating.rateType, rating.text)"
							>
								<div class="rating-user">
									<!-- 评价时间-时间戳 -->
									<div class="time">{{rating.rateTime | formatDate}}</div>

									<!-- 评价的用户名和图像 -->
									<div class="user">
										<span class="name">{{rating.username}}
										</span>
										<img class="avatar" 
										width="14" height="14" 
										:src="rating.avatar">
									</div>
								</div>
								<!-- 评论的具体内容以及前面的图标 -->
								<div class="rating-text">
									<span :class="{'icon-checkmark':rating.rateType === 0,
									'icon-cross':rating.rateType === 1}">
									</span>{{rating.text}}
								</div>
							</li>
						</ul>
						<div v-show="!food.ratings || !food.ratings.length" class="no-rting">
							暂无评价
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</transition>	
</template>

<script>
import Vue from "vue"
import {formatDate} from "@/common/js/date"
import BScroll from "better-scroll"	
import cartcontrol from "@/components/cartcontrol/cartcountrol"
import split from "@/components/split/split"
import rating from "@/components/rating/rating"


const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
	components: {
		cartcontrol,
		split,
		rating
	},
	props: {
 		food: {
 			type: Object
 		}
 	},
	data() {
		return {
			showFlag :false,
			selectType: ALL,
			onlyContent: true,
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽' 
			}
		}
	},
	methods: {
		show() {
			this.showFlag = true
			this.selectType = ALL
			this.onlyContent = true
			this.$nextTick(() => {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.food, {
						click: true
					}) 
				}else{
					this.scroll.refresh()
				}
			})
		},
		backTO() {
			this.showFlag = false
		},
		addFirst(event) {
			// if(!event._contructed){
			// 	return
			// }
			// 点击加入购物车时的小球动画
			// this.$dispatch('cart.add', event.target)
			Vue.set(this.food, "count", 1)
		},
		needShow(type, text) {
			if (this.onlyContent && !text) {
				return false
			}
			if (this.selectType === ALL) {
				return true
			} else {
				return type === selectType
			}
		}
	},
	event: {
		'ratingtype.select'(type) {
			this.selectType == type
			this.$nextTick(() => {
				this.scroll.refresh()
			})
		},
		'content.toggle'(onlyContent) {
			this.onlyContent == onlyContent
			this.$nextTick(() => {
				this.scroll.refresh()
			})
		},
	},
	// 过滤转化时间戳
	filters: {
		formatDate(time) {
			let date = new Date(time)
			return formatDate(date, 'yyyy-MM-dd hh:mm')
		}
	},
	mounted() {
		console.log(this.food)
	}
  }
</script>
<style lang="stylus" scoped>
.food
	position: fixed
	top: 0
	bottom: 0
	z-index: 45
	width: 100%
	background: #fff
	&.trans-enter-active,&.trans-leave-active
		transition: all .3s linear
		transform: translateX(0)
		opacity: 1	
	&.trans-enter,&.trans-leave-to
		transform: translateX(100%)
	.food-content
		width: 100%
		
		.img-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
		// 返回箭头
		.back
			position: absolute
			width: 10px
			height: 10px
			top: 10px
			left: 5px
			padding: 10px
			border-radius: 50%
			background: #fff
			.icon-arrow-left2
				width: 100%
				height: 100%
		// 商品详细
		.content
			text-align: left
			padding:5px 15px
			.title
				color: rgb(7, 17, 27)
				font-size: 1.8rem
				font-weight: 600
				margin-top: 15px
			.detail
				margin-top: 15px
				color: rgb(147, 153, 159)
				font-size: 1.4rem
				.hpl
					margin-left: 12px
		.price
			position: relative
			display: flex
			justify-content: space-between
			height: 41px
			line-height: 41px	
			padding: 5px 15px	
			.myPrice
				.newPrice
					font-weight: 600
					font-size: 1.4rem
					color: red
				.oldPrice
					font-weight: 600
					font-size: 1.4rem
					text-decoration:line-through	
			.button	
				border-radius: 10px
				z-index: 6	
				&.shop-enter-active, &.shop-leave-active
					transition: all .5s linear
					opacity: 1
				&.shop-enter, &.shop-leave-to
					opacity: 0.8	
			.cartWrapper
				position: absolute
				right: 15px
				top: 10px
				z-index: 5	
		// 商品介绍
		.info
			box-sizing: border-box
			width: 100%
			padding: 5px 15px
			.info-title
				text-align: left
				font-size: 1.6rem
			.info-text
				line-height: 28px
				margin-top: 15px
				text-align: left
				text-indent: 20px
				font-size: 1.2rem
				color: rgb(77, 85, 93)	
		// 商品评价	
		.rating
			box-sizing: border-box
			text-align: left
			width: 100%
			padding: 5px 15px
			.rating-title
				text-align: left
				font-size: 1.6rem
			.rating-wrapper	
				width: 100%
			.rating-item
				border-bottom: 1px solid rgba(7, 17, 21, 0.1)
				padding: 5px 15px	
				.rating-user
					display: flex
					justify-content: space-between
					padding: 8px 0
					.time
						font-size: 1.4rem
						color: rgb(147, 153, 159)
						line-height: 24px
					.user
						.name
							font-size: 1.4rem
							color: rgb(147, 153, 159)
							line-height: 24px
						.avatar
							vertical-align: center	
				.rating-text
					line-height: 32px
					color: rgb(7, 17, 27)	
					font-size: 1.6rem	
					.icon-thumb_up,.icon-thumb_down	
						line-height: 24px
						margin-right: 4px
					.icon-checkmark
						color: rgb(0, 160, 220)
					.icon-cross		
						color: rgb(147, 153, 159)
			.no-rting
				font-size: 1.4rem
				color: rgb(147, 153, 159)
				padding: 0 12px
							
</style>
