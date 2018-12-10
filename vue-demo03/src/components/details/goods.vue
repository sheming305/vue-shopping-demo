<template>
	<div class="goods">
		<!-- 左侧商品列表 -->
		<div class="munuList" ref="munuList">
			<ul>
				<li class="title"
				 :class="{'active':currentIndex === index}"
				  v-for="(item,index) in goods" 
				  @click.prevent="selectMenu(index, $event)">
					<span class="text">
						<!-- 当type>0的时候前面的小标签显示出来 -->
						<span v-show="item.type>0" class="icon"></span>
						{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<!-- 右侧信息列表 -->
		<div class="foodsList" ref="foodsList">
			<ul class="foods-munu">
				<li class="foods food-list-hook" v-for="(item,index) in goods">
					<h1 class="title">{{ item.name }}</h1>
					<ul class="foods-list">
						<li @click.stop="selectFood(food, $event)" class="foods-content" v-for="food in item.foods">
							<div class="icon">
								<img :src="food.icon">
							</div>
							<div class="content">
								<h2>{{ food.name }}</h2>
								<p class="mt">{{ food.description }}</p>
								<div class="extra mt">
									<span>月售:{{ food.sellCount }}份</span>
									<span class="hao-ping">好评率:{{ food.rating }}%</span>
								</div>
								<div class="pay-food mt">
									<div>
										<span class="new-price">￥{{ food.price }}</span>
										<span class="old-price" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
									</div>
									<!-- 加减按钮 -->
									<div class="ctrol">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</div>
						</li> 
					</ul> 
				</li>
			</ul>
		</div>
		<!-- 购物车组件的引入 -->
		<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<tfood ref="food" :food="selectedFood"></tfood>
	</div>
</template>

<script>
import BScroll from "better-scroll"	
import shopcart from "@/components/shopcart/shopcart"
import cartcontrol from "@/components/cartcontrol/cartcountrol"
import tfood from "@/components/food/food"
export default {
  props: {
  	seller: {
  		type: Object
  	}
  },
  components: {
  	shopcart,
  	cartcontrol,
  	tfood
  },
  data () {
    return {
    	goods: [],
    	// nowIndex: 0,
    	listHeight: [],
    	scrollY: 0,
    	selectedFood: {},
    	food: {}
     }
    },
    computed: {
    	currentIndex () {
    		for(let i=0; i<this.listHeight.length; i++ ) {
    			let height1 = this.listHeight[i]
    			let height2 = this.listHeight[i + 1]
    			if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    				return i
    			}
    		}
    		return 0
    	},
    	selectFoods () {
    		let foods = []
    		this.goods.forEach((good) => {
    			good.foods.forEach((food) => {
    				if (food.count) {
    					foods.push(food)
    				}
    			})
    		})
    		return foods
    	}
    },
    methods: {
    	_drop (target) {
    		this.$refs.shopcart.drop(target)
    	},
    	getGoods () {
    		this.$http.get('/api/goods')
    		.then((res) => {
    			let _that = this
    			if( res.data.errno===0 ) {
    				_that.goods = res.data.data
    				this.$nextTick(() => {
    					this._initScroll()
    					this._calculateHeight()
    				})
    				
    			}
    		})
    		.catch( (error) => {
    			console.log(error);
    		});
    	},
    	 selectMenu (index, event) {
    		 if (!event._constructed) {//如果不存在这个属性,则为原生点击事件，不执行下面的函数
        		return 
    		}
    		let foodList = this.$refs.foodsList.getElementsByClassName("food-list-hook")
    		let el = foodList[index]
    		this.foodsScroll.scrollToElement(el,200)
    		console.log(index)

    	},
    	_initScroll () {
    		this.munuScroll = new BScroll(this.$refs.munuList, {
    			click: true
    		})
    		this.foodsScroll = new BScroll(this.$refs.foodsList, {
    			probeType: 3 
    		})
    		this.foodsScroll.on('scroll',(pos) => {
    			this.scrollY = Math.abs(Math.round(pos.y))
    		})
    	},
    	_calculateHeight () {
    		let foodList = this.$refs.foodsList.getElementsByClassName("food-list-hook")
    		console.log(foodList)
    		let height = 0
    		this.listHeight.push(height)
    		for(let i = 0; i < foodList.length; i++) {
    			let item = foodList[i]
    			height += item.clientHeight
    			this.listHeight.push(height)
    		}
    	},
    	selectFood (food, event) {
    		console.log(event)
    		this.selectedFood = food
    		// console.log(this.selectedFood)
    		this.$refs.food.show()
    	}
    },
    mounted () {
    	this.getGoods()
    	this._initScroll()
    },
    events: {
    	'cart.add'(target) {
    		this._drop(target)
    	}
    }
  }
</script>


<style lang="stylus" scoped>
.goods
	display: flex
	width: 100%
	position: absolute
	top: 216px
	bottom: 60px
	overflow: hidden
	// 左侧列表
	.munuList
		flex: 0 0 120px
		width: 120px
		background: #f3f5f7
		// flex-wrap: wrap
		.title
			width: 100%
			height: 50px
			line-height: 50px
			border-bottom: 1px solid rgba(7, 17, 21, 0.1)
			text-align: center
			color: #999
			&.active
				background: #fff
				.text
					color: #666
					font-size: 1.2rem			
	// 右侧信息列表
	.foodsList
		flex: 1	
		.foods-munu
			width: 100%
			list-style: none
			// overflow-y: auto
			.foods
				width: 100%
				.title
					font-size: 1.6rem
					color: rgb(147, 153, 159)
					height: 37px
					line-height: 37px
					background: #f3f5f7
					border-left: 5px solid #d9dde1	
				.foods-list
					margin-top: 0	
					box-sizing: border-box			
					.foods-content
						color: #07111B
						display: flex
						flex-wrap: wrap
						justify-content: space-between
						width: 100%
						// margin-top: 1px
						border-bottom: 1px solid rgba(7, 17, 27, 0.1)
						padding: 12px 8px
										
						.icon
							width: 80px
							height: 80px
							line-height: 80px
							img
								width: 100%
								height: 100%
						.content
							flex: 1	
							text-align: left
							padding: 0 8px	
							.extra
							.mt
								margin-top: 5px	
								.hao-ping
									margin-left: 15px
							.pay-food
								display: flex
								justify-content: space-between
								.new-price
									color: red	
								.old-price
									text-decoration:line-through
							.ctrol
								display: inline-block
								font-size: 0
								padding:0 18px
										
								

		
</style>
