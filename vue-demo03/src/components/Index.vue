<template>
  <div class="container">
  	<my-header :seller="seller"></my-header>
  	<div class="tab">
  		<router-link tag="div" class="tab-item" :to="{ path:'/Goods' }">
	  		<span class="tab-link">
				商品
	  		</span>
  		</router-link>
  		<router-link tag="div" class="tab-item" :to="{ path:'/Ratings' }">
	  		<span class="tab-link">
				评价
	  		</span>
  		</router-link>
  		<router-link tag="div" class="tab-item" :to="{ path:'/Seller' }">
	  		<span class="tab-link">
				商家
	  		</span>
  		</router-link>
  	</div>
  	<keep-alive>
  		<router-view :seller="seller"></router-view>	
  	</keep-alive>
  </div>
</template>

<script>
import header from "@/components/header/header"
import{urlParse} from "@/common/js/util"
export default {
 components: {
  	MyHeader: header
  },
  data () {
    return {
     seller: {
      id: (() => {
        let queryParm = urlParse()
        console.log(queryParm)
        return queryParm.id
      })()
     }
    }
  },
  methods: {
  	getSeller () {
  		this.$http.get('/api/seller?id='+this.seller.id)
  		.then((res) => {
  			// console.log(res.data)
  			let _that = this
  			if( res.data.errno===0 ) {
  				_that.seller = res.data.data
  				// console.log(_that.seller) 
          

  			}
  		})
  		.catch( (error) => {
  			console.log(error);
  		});
  	},
  },
  mounted() {
  	this.getSeller()
  }
}
</script>


<style lang="stylus" scoped>
	.tab
		display: flex
		// justify-content: space-between
		width: 100%
		height: 40px
		line-height: 40px
		border-bottom: 1px solid rgba(7, 17, 27, 0.1)
		.tab-item
			flex: 1
			text-align: center
			.tab-link
				font-size: 22px
				color: rgb(77, 85 ,93)
			&.router-link-active
				.tab-link
					font-size: 22px
					color: rgb(240, 20 ,20)
</style>
