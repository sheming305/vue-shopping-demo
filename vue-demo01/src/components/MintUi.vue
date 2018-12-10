<template>
  <div>
    <button type="button" @click="SetNum">点击+5</button>
    <button type="button" @click="GetNum">点击-5</button>
    <router-link to="/Shopping">
      <button type="button">go shopping</button>
    </router-link>
    <p>数字是：{{ num }}</p>
    <m-table></m-table>
  </div>
</template>
  
<script>
  import {mapGetters, mapActions} from "vuex"
  import table from "@/components/table"
  export default {
    components: {
      mTable: table
    },
    data() {
      return {
       
      }
    },
    computed: {
      ...mapGetters(["num"]),
    },
    
    methods: {
      ...mapActions([
          "SetNum",
          "GetNum"
        ])
    }
    }
</script>

<style>

</style>
