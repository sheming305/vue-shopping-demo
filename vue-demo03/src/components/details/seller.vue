<template>
	<div class="seller" ref="slider">
		<!-- 商家主体 -->
		<div class="seller-content">
			<div class="overview">
				<div class="title">
					{{seller.name}}
				</div>
				<div class="shoucang" @click.stop="toggleFavorite">
					<img width="22" height="22" :class="{'active': favorite}">
					<span>{{favoriteText}}</span>
				</div>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="ul">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span>{{seller.minPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span>{{seller.deliveryPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span>{{seller.deliveryTime}}分钟</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="pro">
			<h1 class="title">公告与活动</h1>
			<p class="text">{{seller.bulletin}}</p>
		</div>
		<ul v-if="seller.supports" class="supports">
			<li class="supports-items" v-for="(item,index) in seller.supports">
				<span class="icon" :class="ClassName[seller.supports[index].type]"></span>
				<span class="text">{{ seller.supports[index].description }}</span>
			</li>
		</ul>
		<split></split>
		<!-- 商家实景 -->
		<div class="sjsj" ref="picWrapper">
			<h1>商家实景</h1>
			<div class="pics">
				<ul class="sjul" ref="picList">
					<li class="pic-item" v-for="pic in seller.pics">
						<img width="100" height="90" :src="pic">
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<!-- 地址信息 -->
		<div class="infos">
			<h1>商家信息</h1>
			<ul class="infos-list">
				<li class="infos-item" v-for="info in seller.infos">
					{{info}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import star from "@/components/star/star"
import split from "@/components/split/split"
import BScroll from "better-scroll"	
// import slider from '@/components/slider/slider'
export default {
components: {
	star,
	split
	// slider
},
  props: {
  	seller: {
  		type: Object
  	}
  },
  data () {
    return {
    	imgURL: require('../../common/images/shoucang.png'),
    	favorite: false
     }

    },
    created() {
  	this.ClassName = ['decrease','discount','guarantee','invoice','special']
  },
  watch: {
  	// "seller"() {
  	// 	this._initScroll()
  	// 	this._initPics()
  	// }
  },
  ready() {
  	// this._initScroll()
  	// this._initPics()
  },
  computed: {
      favoriteText() {
      	if (this.favorite === true) {
      		return `已收藏`
      	} else {
      		return `收藏`
      	}
      }
  },
  methods: {
  	toggleFavorite(event) {
  		this.favorite = !this.favorite
  	}
  	// _initScroll() {
  	// 	if (!this.scroll) {
  	// 		this.scroll = new BScroll(this.$refs.slider, {
  	// 			click: true
  	// 		})
  	// 	}
  	// },
  	// _initPics() {
  	// 	if (this.seller.pics) {
  	// 		let picWidth = 120
  	// 		let margin = 6
  	// 		let width = (picWidth + margin) * this.seller.pics.length-margin
  	// 		this.$refs.picList.style.width = width + 'px'
  	// 		this.$nextTick(() => {
  	// 			this.picScroll = new BScroll(this.$refs.picWrapper)
  	// 			scrollX: true
  	// 			eventPassthrough: 'vertical'
  	// 		})
  	// 	}	
  	// }
  }
}
</script>


<style lang="stylus" scoped>
	.seller
		position: absolute
		top: 216px
		bottom: 0
		left: 0
		width: 100%
		overflow:auto
		box-sizing: border-box
		.seller-content
			width: 100%
			.overview
				width: 100%
				margin-top: 8px
				position: relative
				.title
					color: rgb(7, 17, 27)
					line-height: 22px
					font-size: 1.6rem
					text-align: left
					padding-left: 10px
				.shoucang
					position: absolute
					top: 10px
					right: 15px 
					font-size: 1.4rem
					img
						display: block
						margin-left: 6px
					span
						display: block
						margin-top: 5px		
				.desc
					border-bottom: 1px solid rgba(7, 17, 27, 0.2)
					display: flex
					height: 40px
					line-height: 40px
					padding-left: 10px
					margin-top: 8px
					span
						margin-left: 10px
						font-size: 1.2rem
				.ul
					display: flex
					justify-content: space-between
					margin: 15px 0
					padding: 8px 10px
					.block
						h2
							color: rgb(147, 153, 159)
							font-size: 1.4rem
						.content
							color: rgb(7, 17, 27)
							font-size: 1.4rem
							line-height: 24px
		.pro
			text-align: left
			margin-top: 15px
			padding: 8px 10px
			border-bottom: 1px solid rgba(7, 17, 27, 0.2)
			.title
				color: #666
				font-size: 1.4rem
				line-height: 24px
			.text
				color: rgb(240, 20, 20)
				font-size: 1.4rem
				line-height: 28px
					
		.supports
			text-align: left
			margin: 6px 0
			padding: 8px 10px
			.supports-items	
				border-bottom: 1px solid rgba(7, 17, 27, 0.2)
				padding: 8px 0
				&:last-child
					border-bottom: none
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
					color: rgb(7, 17, 27)
					font-size: 1.4rem
					line-height: 24px
		// 实景图片
		.sjsj
			width: 100%
			margin: 6px 0
			padding: 8px 10px
			text-align: left
			box-sizing: border-box
			.pics
				.sjul
					display: flex
					justify-content: space-between
					margin: 5px auto
					flex-wrap: nowrap
					overflow: hidden
					.pic-item
						margin: 6px 
		.infos
			width: 100%
			text-align: left
			margin: 8px auto
			h1
				color: rgb(7, 17, 27)
				font-size: 1.6rem
				line-height: 24px
				margin-left: 10px
			.infos-list
				padding: 5px 10px	
				.infos-item
					color: rgb(7, 17, 27, 0.5)
					font-size: 1.2rem
					line-height: 22px	
					padding: 8px 6px
					border-bottom: 1px solid rgba(7, 17, 27, 0.2)
					&:last-child
						border-bottom: none
						
																			
						
					
			
		
</style>
