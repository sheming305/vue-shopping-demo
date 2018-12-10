<template>
  <!-- 购物车实现加减组件 -->
  <div class="cartcountrol">
    <transition name="move">
  	   <div class="decrease" v-show="food.count > 0" @click.stop="decCount">-</div>
    </transition> 
     <div class="count" v-show="food.count > 0">{{ food.count }}</div>
     <div class="add" @click.stop="addCart">+</div>
  </div>
</template>

<script>
  import Vue from "vue"
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
    
    }
  },
  methods: {
    addCart(event) {
      if(!this.food.count) {
          Vue.set(this.food,'count',1)
        } else {
          this.food.count++
      }
      // this.$dispatch('cart.add', event.target)
    },
    decCount(event) {
      if(this.food.count) {
       this.food.count--
     }
  }
},
  mounted() {
  
  }
}
</script>


<style lang="stylus" scoped>
.cartcountrol
  .decrease,.add 
    display: inline-block
    width: 20px
    height: 20px
    line-height: 20px
    background: green
    text-align: center
    border-radius: 50%
    font-size: 1.6rem
    color: #fff
    font-weight: bold
    color: #fff
    margin-left: 10px 
    &.move-enter, &.move-leave-to
      opacity: 1
      transform: translate3D(24px, 0, 0) 
      transform: rotate(180deg)    
    &.move-enter-active, &.move-leave-active
      opacity: 0
      transition: all .5s linear
  .count
    display: inline-block
    color: rgb(147, 153, 159)
    font-size: 1.4rem
    text-align: center
    margin-left: 10px
</style>
