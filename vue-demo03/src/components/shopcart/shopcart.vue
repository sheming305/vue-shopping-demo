<template>
  <!-- 购物车组件 -->
  <div class="shopcart">
    <div class="content">
      <!-- 左侧部分 -->
      <div class="content-left">
        <div class="logo-wrapper" @click="toggleList">
          <div class="logo-content" :class="{'highLight' : totalCount > 0}">
            <img class="logo" src="@/common/images/shopping.png">
          </div>
          <!-- 购物车图标上面的数字显示 -->
          <div v-show="totalCount > 0" class="num">{{ totalCount }}</div>
        </div>

        <div class="price" :class="{'highLight' : totalPrice > 0}">￥{{ totalPrice }}元</div>
        <div class="line"></div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <!-- 右侧部分 -->
      <div :class="payclass" class="content-right">
       {{ paydesc }}
     </div>
     <!-- 小球动画 -->
     <div class="ball-container">
      <transition name="drop">
        <div class="ball" 
        v-for="ball in balls" 
        :key="ball" 
        @before-enter="beforeEnter" 
        @enter="enter" 
        @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </div>
      </transition>
      </div>
      <!-- 购物车列表 -->
      <transition name="fold">
       <div v-show="listShow" class="shopcart-list">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price * food.count }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition> 
  </div> 
    
</div>

</template>

<script>
  import { MessageBox } from 'mint-ui'
  import cartcontrol from "@/components/cartcontrol/cartcountrol"
export default {
  components: {
    cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
       balls: [
         {
          show: false
         },
         {
          show: false
         },
         {
          show: false
         },
         {
          show: false
         },
         {
          show: false
         }
       ],
       dropBalls:[],
       fold: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    paydesc() {
      if(this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      }else if(this.totalPrice < this.minPrice) {
        let n = this.minPrice - this.totalPrice
        return `还差￥${n}元起送`
      }else{
        return `去结算`
      }
    },
    payclass() {
      if(this.totalPrice < this.minPrice) {
        return 'not-enough';
      }else{
        return 'enough';
      }
    },
    listShow() {
      if(!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      return show
    }
  },
  methods: {
    drop(el) { 
      //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball); 
            return;
          }
        }
      },

      beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
            el.style.display = ''; //清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
            el.style.transform = `translate3d(0,${y}px,0)`;
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },

      afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
        }
      },
    toggleList() {
      if(!this.totalCount){
        return
      }
       this.fold = !this.fold
    },
    empty() {
      MessageBox.confirm('确定执行此操作?').then(action => {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      }).catch(() => {

      })
    }
  },
  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    display: flex
    justify-content: space-between
    position: fixed
    width:100%
    height: 60px
    line-height: 60px
    bottom: 0
    left: 0
    background: #131D26
    z-index: 99
    .content
      display: flex
      width: 100%
      // 左侧部分
      .content-left
        flex: 0 0 250px
        width: 250px
        display: flex
        padding: 3px 12px
        justify-content: space-between
        .line
          width: 1px
          background: rgba(255, 255, 255, 0.1)
        .price
          font-size: 1.6rem
          color: rgba(255, 255, 255, 0.4)
          font-weight: 300
          &.highLight
            color: #fff
        .desc
          font-size: 1.2rem
          color: rgba(255, 255, 255, 0.4)
          font-weight: 300 
        .logo-wrapper
          position: relative
          top: -10px
          // margin: 0 12px
          padding: 6px
          background: #131D26
          width: 70px
          height: 60px
          line-height: 56px
          box-sizing: border-box
          border-radius: 50%
          .num
            position: absolute
            top: 10px
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            font-size: 1.4rem
            border-radius: 16px
            font-weight: 300
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          .logo-content
            width: 50px
            height: 50px
            border-radius: 50%
            background: #2b343c
            padding: 3px
            &.highLight
              background: rgb(0, 160, 220)
            .logo
              width: 35px
              height: 35px
              vertical-align: middle
              text-align: center
      // 右侧部分
      .content-right  
        background: #2b333b
        padding: 3px 2px
        flex: 1  
        font-size: 1.2rem
        color: rgba(255, 255, 255, 0.4)
        font-weight: 300 
        &.not-enough
          background: #2b333b
        &.enough
          background: #00b43c 
          color: #fff
      .shopcart-list
        position: absolute
        bottom: 60px
        left: 0
        z-index: 15
        width: 100%
        background: #fff
        &.fold-enter-active, &.fold-leave-active
          transition: all .5s linear
          transform: translate3d(0, 0, 0)
        &.fold-enter
          transform: translate3d(0, 100%, 0)
        &.fold-leave-to
          transform: translate3d(0, 100%, 0)  
        .list-header
          display: flex
          justify-content: space-between
          padding: 3px 10px
          height: 55px
          line-height: 55px
          background: #f3f5f7
          .title
            font-size: 1.8rem
            color: rgb(7, 17, 27)
          .empty
            font-size: 1.6rem
            color: rgb(0, 160, 20) 
        .list-content
          box-sizing: border-box
          padding: 3px 10px
          max-height: 250px
          overflow: auto
          .food
            display: flex
            justify-content: space-between
            border-bottom:1px solid rgba(7, 17, 27, 0.1)
            .name
              display: inline-block
              flex: 0 0 230px
              width: 230px
              font-size: 1.6rem
              color: rgb(7, 17, 27)
              text-align: left
            .price
              font-size: 1.4rem
              color: rgb(240, 20, 20)
              font-weight: 600 
            
      
        
        
            
      // 小球动画
      .ball-container
        .ball
          position fixed
          left: 32px
          bottom: 22px
          z-index:200
          transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0,160,220)
            transition: all .6s linear
    // 遮罩层
    // .list-mask
    //   position: fixed
    //   top: 0
    //   left: 0
    //   width: 100%
    //   height: 100%
    //   z-index: 40  
    // .fade-enter-active, .fade-leave-active  
    //   transition: all .5s linear
    //   opsity: 1
    //   background: rgba(7, 17, 27, 0.6)
    // .fade-enter, .fade-leave-to
    //   opsity: 0
    //   background: rgba(7, 17, 27, 0)      
        
</style>
