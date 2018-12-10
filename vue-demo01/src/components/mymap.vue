<template>
  <div style="width:1200px;height:400px;border:#ccc solid 1px;font-size:12px;margin:0 auto;" id="map">
    
  </div>
</template>
  
<script>
  // 引入地图标识图片
  import bikelogo from "@/assets/images/bike.png"
  export default {
    data() {
     return {
      num: 1
     }
  },
      methods: {
          addMarker(map, point) {  // 创建图标对象   
            var myIcon = new BMap.Icon(bikelogo, new BMap.Size(23, 25), {    
           anchor: new BMap.Size(10, 25),     
          });      
          // 创建标注对象并添加到地图   
          var marker = new BMap.Marker(point, {icon: myIcon});    
          map.addOverlay(marker);    
          }    
          // // 随机向地图添加10个标注    
          //   var bounds = map.getBounds();    
          // var lngSpan = bounds.maxX - bounds.minX;    
          // var latSpan = bounds.maxY - bounds.minY;    
          // for (var i = 0; i < 10; i ++) {    
          // var point = new BMap.Point(bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15),    
          // bounds.minY + latSpan * (Math.random() * 0.7 + 0.15));    
          // addMarker(point, i);    
          // }
      },

  mounted() {
      var map = new BMap.Map("map"); //创建地图实例
      var point = new BMap.Point(116.331398,39.897445); //创建点坐标
      
      // 定位
      var self = this
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          // alert('您的位置：'+r.point.lng+','+r.point.lat);
          point = new BMap.Point(r.point.lng,r.point.lat); //创建点坐标
        }
        else {
          alert('failed'+this.getStatus());
        }       
        //初始化地图，设置中心点坐标和地图级别 
        map.centerAndZoom(point,15); 

        // 取得数据在需要跨域的情况下需要设置config里面的index.js里面的 proxyTable: {}
         // 以下是模仿共享单车的api的反向代理
        fetch(`/api/broken-bikes?lat=${r.point.lat}&lng=${r.point.lng}`).then((res) => {
          return res.json();
        }).then((json) => {
          // 把从后台获取到的所有共享单车数据坐标填充在每个marker坐标上
          for(let i=0;i<json.length;i++) {

            let point = new BMap.Point(json[i].lat,json[i].lng)

            self.addMarker(map, point)
          }
        })


        

      },{enableHighAccuracy: true})
    }
}

</script>

<style lang="stylus">
  #container
    height:100%
</style>
