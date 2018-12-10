<template>
  <!-- 商家评价评分星星组件 -->
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
 // 父组件传过来的评价分数
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score*2) / 2
      let hasDecimal = score % 1 != 0
      let inTeger = Math.floor(score)
      for (let i=0; i < inTeger ;i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star
    // width:100%
    // padding: 10px 0
    text-align: center
    // height: 50px
    // line-height:50px
    .star-item
      display: inline-block
    &.star-48
      .star-item
        width: 40px
        height: 40px
        margin-right: 22px
        &:last-child
          margin-right: 0
        &.on
          background: url("../../common/images/star48_on@2x.png") no-repeat
        &.half
          background: url("../../common/images/star48_half@2x.png") no-repeat
        &.off
          background: url("../../common/images/star48_off@2x.png") no-repeat
    &.star-36
      .star-item
        width: 30px
        height: 30px
        margin-right: 6px
        &:last-child
          margin-right: 0
        &.on
          background: url("../../common/images/star36_on@2x.png") no-repeat
        &.half
          background: url("../../common/images/star36_half@2x.png") no-repeat
        &.off
          background: url("../../common/images/star36_off@2x.png") no-repeat  
    &.star-24
      .star-item
        width: 20px
        height: 20px
        margin-right: 3px
        &:last-child
          margin-right: 0
        &.on
          background: url("../../common/images/star24_on@2x.png") no-repeat
        &.half
          background: url("../../common/images/star24_half@2x.png") no-repeat
        &.off
          background: url("../../common/images/star24_off@2x.png") no-repeat  
     
    
       
</style>
