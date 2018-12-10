<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot>
			</slot>
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll"	
export default {
components: {

},
  data () {
    return {
    	
     }

    }

}
</script>

<style lang="stylus" scoped>
.slider
    min-height: 1px
    .slider-group
      overflow: hidden	
</style>
