<template>
	<!-- 商品评价页组件 -->
	<div class="ratingselect">
		<div class="ratingtype">
			<mt-button @click="select(2, $event)" :class="{'active': selectType === 2}" size="small" plain class="button" type="primary">{{desc.all}} {{ratings.length}}
			</mt-button>
			<mt-button @click="select(0, $event)" :class="{'active': selectType === 0}" size="small" plain class="pj" type="primary">{{desc.positive}} {{positives.length}}</mt-button>
			<mt-button @click="select(1, $event)" :class="{'active': selectType === 1}" size="small" class="pj" type="default">{{desc.negative}} {{negatives.length}}</mt-button>
		</div>
		<div @click="toggleContent" class="switch">
			<span class="icon-point-right"></span>
			<span class="rating-text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2	

export default {
	props: {
		ratings: {
			type: Array,
			dafault() {
				return []
			}
		},
		selectType: {
			type: Number,
			dafault: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意' 
				}
			}
		}
	},
	data() {
		return {

		}
	},
	computed: {
		positives() {
			// 过滤
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE
			})
		},
		negatives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE
			})
		}
	},
	methods: {
		select(type, event) {
			// if(!event._contructed){
			// 	return
			// }
			this.selectType = type
			this.$emit('ratingtype.select', type)
		},
		toggleContent(event) {
			// if(!event._contructed){
			// 	return
			// }
			this.onlyContent = !this.onlyContent
			this.$emit('content.toggle', this.onlyContent)
		}
	},
	mounted() {

	}
  }
</script>
<style lang="stylus" scoped>
	.ratingselect
		margin-top: 10px
		.ratingtype
			margin-top: 15px
			.button
				font-size: 1.2rem
				color: #333
				&.active
					background: #26A2FF
					color: #fff
			.pj
				margin-left: 10px
				font-size: 1.2rem
				color: #333
				&.active
					background: #26A2FF
					color: #fff
		.switch	
			margin-top: 15px
			border-bottom: 1px solid rgba(7, 17, 21, 0.1)
			.rating-text
				font-size: 1.6rem
				color: rgb(147, 153, 159)
				line-height: 48px
			
			
		
	
			
</style>
