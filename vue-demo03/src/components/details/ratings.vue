<template>
	<!-- 评价页 -->
	<div class="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score">
						<span class="title">服务态度 </span>
						<star class="star" :size="36" :score="seller.serviceScore"></star>
						<span class="mscore">{{seller.serviceScore}}</span>
					</div>
					<div class="score">
						<span class="title">商品评分 </span>
						<star class="star" :size="36" :score="seller.foodScore"></star>
						<span class="mscore">{{seller.foodScore}}</span>
					</div>
					<div class="score">
						<span class="title">送达时间  <span class="min">{{seller.deliveryTime}}分钟</span></span>
						
					</div>
				</div>
			</div>
		</div>
		<split></split>
		<!-- 引入评价组件 -->
		<div class="my-rating">
			<rating :select-type="selectType" :only-content="onlyContent" :ratings="ratings">
			</rating>
		</div>
		<!-- 评价列表 -->
		<div class="rating-wrapper">
			<ul>
				<li v-for="rating in ratings" class="rating-item">
					<div class="avatar">
						<img :src="rating.avatar">
					</div>
					<div class="content">
						<h1 class="name">{{rating.username}}</h1>
						<div class="star-wrapper">
							<star style="text-align: left" :size="24" :score="rating.score"></star>
							<span v-show="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}</span>
						</div>
						<p class="text">
							{{rating.text}}
						</p>
						<div class="reconmend" v-show="rating.recommend && rating.recommend.length"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import split from "@/components/split/split"
import star from "@/components/star/star"	
import rating from "@/components/rating/rating"
const ALL = 2
export default {
	components: {
	 	split,
	 	star,
	 	rating
	},
  props: {
  	seller: {
  		type: Object
  	}
  },
  data () {
  	return {
		selectType: ALL,
		onlyContent: true,
		ratings: []
  	}
  },
  methods: {
  	getRatings () {
  		this.$http.get('/api/ratings')
  		.then((res) => {
  			// console.log(res.data)
  			let _that = this
  			if( res.data.errno===0 ) {
  				_that.ratings = res.data.data
  				// console.log(_that.seller)
  			}
  		})
  		.catch( (error) => {
  			console.log(error);
  		});
  	},
  },
  mounted() {
  	this.getRatings()
  }
  }
</script>


<style lang="stylus" scoped>
	.ratings
		position: absolute
		top: 216px
		bottom: 0
		left: 0
		width: 100%
		overflow:auto
		.overview
			display: flex
			justify-content: space-between
			padding: 10px 15px
			.overview-left
				text-align: center
				flex: 0 0 80px
				width: 80px
				padding-right: 5px
				border-right: 1px solid rgba(7, 17, 27, 0.2)
				.score
					font-size: 1.6rem
					color: rgb(255, 153, 0)
					line-height: 32px
				.title
					font-size: 1.4rem
					color: rgb(7, 17, 27)
					line-height: 24px
				.rank		
					font-size: 1.2rem
					color: rgba(7, 17, 27, 0.5)
					line-height: 22px
			.overview-right
				flex: 1
				.score
					display: flex
					justify-content: space-between
					padding-left: 5px
					height: 30px
					line-height: 32px
					.title
						font-size: 1.2rem
						.min
							font-size: 1.4rem
							color: rgba(7, 17, 27, 0.5)		
		.my-rating
			width: 100%
			.ratingselect
				padding: 5px 12px
				text-align: left
		.rating-wrapper
			.rating-item
				display: flex
				justify-content: space-between
				margin-top: 15px
				.avatar
					flex: 0 0 100px
					width: 100px
					img
						width: 100%
			.content
				text-align: left
				flex: 1
				padding: 0 10px	
				.name
					line-height: 24px
				.star-wrapper
					line-height: 24px
				.text
					line-height: 24px
				.reconmend
					line-height: 24px			
							
						
				
					
									
					
			
		
</style>
