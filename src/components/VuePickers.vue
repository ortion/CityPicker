<template>
  <div id="picker">
      <div class="mobileSelect" :class="{'mobileSelect-show':show}">
        <div class="grayLayer"></div>
        <div class="content">
          <div class="btn_box">
            <div class="cancel" @click="close">取消</div>
            <div class="title">请选择</div>
            <div class="finish" @click="finish">确定</div>
          </div>
          <div class="area_roll_mask">
            <div class="area_roll">
              <div>
                <div top="0"
                    ref="province" 
                    class="gear area_province"
                    data-areatype="area_province"
                    data-type="provs"
                    :data-len="provinces.length"
                    val="5"
              
                          @touchstart="gearTouchStart"
                    @touchmove="gearTouchMove"
                    @touchend="gearTouchEnd"
                          @mousedown="gearTouchStart"
                    @mousemove="gearTouchMove"
                    @mouseup="gearTouchEnd">
         
                  <div class="tooth" v-for="(province,index) in provinces" :key="index">{{province.value}}</div>
                </div>
                <div class="area_grid">
                </div>
              </div>
              <div>
                <div 
                    class="gear area_city" 
                    top="0" 
                    ref="city"
                    data-areatype="area_city" 
                    data-type="city"
                    :data-len="cities.length"
                    @touchstart="gearTouchStart"
                    @touchmove="gearTouchMove"
                    @touchend="gearTouchEnd"
                          @mousedown="gearTouchStart"
                    @mousemove="gearTouchMove"
                    @mouseup="gearTouchEnd"
                    val="5">
              
                  <div class="tooth" v-for="(city,index) in cities" :key="index">{{city.value}}</div>
                </div>
                <div class="area_grid">
                </div>
              </div>
              <div>
                <div 
                    class="gear 
                    area_county" 
                    top="0"
                    ref="county"
                    data-areatype="area_county" 
                    data-type="county"
                    :data-len="districts.length"
                    @touchstart="gearTouchStart"
                    @touchmove="gearTouchMove"
                    @touchend="gearTouchEnd"
                        @mousedown="gearTouchStart"
                    @mousemove="gearTouchMove"
                    @mouseup="gearTouchEnd"
                    val="5">
        
                  <div class="tooth" v-for="(county,index) in districts" :key="index">{{county.value}}</div>
                </div>
                <div class="area_grid">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "picker",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    provincesData: {
      type: Array,
      default: []
    },
    citiesData: {
      type: Array,
      default: []
    },
    districtsData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      provinces: [],
      cities: [],
      districts: [],
      selects: {
        select1: "",
        select2: "",
        select3: ""
      },
      noData: false
    };
  },
  created() {
    // this.init();
  },

  mounted() {
    this.provinces = this.provincesData;
  },
  watch: {
    // show(val) {
    //   val && this.setTop(this.provincesData,this.citiesData,this.districtsData);
    // },
    citiesData: function(newValue, oldValue) {
      this.citiesData = newValue;
      this.updataList();
    },
    districtsData: function(newValue, oldValue) {
      this.districtsData = newValue;
      this.updataList();
    }
  },
  methods: {
    updataList() {
      this.cities = this.citiesData;
      this.districts = this.districtsData;
    },
    setGear(target, val) {
      var type = target.getAttribute("data-type");
      // var _self = this;
      var endVal = Math.round(val);
      if (type === "provs") {
        if (this.provinces[endVal].id) {
          this.$emit("provincesID", this.provinces[endVal].id);
          this.selects.select1 = this.provinces[endVal];
          this.resetData2(endVal);
          this.resetData3(0);
        }
      } else if (type === "city") {
        if (this.cities[endVal].id) {
          this.$emit("citiesID", this.cities[endVal].id);
          this.selects.select2 = this.cities[endVal];
          this.resetData3(endVal);
        }
      } else {
        this.selects.select3 = this.districts[endVal];
      }
    },
    resetData2(endVal) {
      this.$nextTick(() => {
        var city = this.$refs.city;
        // if (this.provinces[endVal]) {
        //   this.cities = this.selectData.pData2[this.pData1[endVal].value];
        // } else {
        //   this.pData2 = [];
        // }
        this.selects.select2 = this.citiesData[0];
        city.setAttribute("top", 0);
        city.style["-webkit-transform"] = "translate3d(0, 0, 0)";
      });
    },
    resetData3(endVal) {
      this.$nextTick(() => {
        var county = this.$refs.county;
        // if (this.pData2.length > 0 && this.pData2[endVal]) {
        //   this.pData3 = this.selectData.pData3[this.pData2[endVal].value];
        // } else {
        //   this.pData3 = [];
        // }
        this.selects.select3 = this.districtsData[0];
        county.setAttribute("top", 0);
        county.style["-webkit-transform"] = "translate3d(0, 0, 0)";
      });
    },
     setTop(provincesData,citiesData,districtsData) {
       console.log(provincesData,citiesData,districtsData)
      this.$nextTick(() => {
        var province = this.$refs.province;
        var city = this.$refs.city;
        var county = this.$refs.county;
        var pos1 = 0;
        var pos2 = 0;
        var pos3 = 0;
        if (provincesData) {
          this.selects.select1 = this.provincesData[0];
          // for (var i = 0, len = this.provinces.length; i < len; i++) {
          //   if (this.provinces[i].value == defaultData[0].value) {
          //     pos1 = -(i * 2);
          //     break;
          //   }
          // }
          province.style.transform = province.style["-webkit-transform"] =
            "translate3d(0," + pos1 + "em,0)";
          province.setAttribute("top", pos1 + "em");
        }
        if (citiesData) {
          // for (var i = 0, len = this.pData2.length; i < len; i++) {
          //   if (this.pData2[i].value == defaultData[1].value) {
          //     pos2 = -(i * 2);
          //     break;
          //   }
          // }
          this.selects.select2 = this.citiesData[0];
          city.setAttribute("top", pos2 + "em");
          city.style["-webkit-transform"] = "translate3d(0," + pos2 + "em,0)";
        }
        if (districtsData) {
          // for (var i = 0, len = this.pData3.length; i < len; i++) {
          //   if (this.pData3[i].value == defaultData[2].value) {
          //     pos3 = -(i * 2);
          //     break;
          //   }
          // }
          this.selects.select3 = this.districtsData[0];
          county.setAttribute("top", pos3 + "em");
          county.style["-webkit-transform"] = "translate3d(0," + pos3 + "em,0)";
        }
      });
    },
    close: function(e) {
      this.$emit("cancel");
      e.preventDefault();
    },
    finish: function(e) {
      this.$emit("confirm", this.selects);
      e.preventDefault();
    },
    gearTouchStart(e) {
      e.preventDefault();
      var target = e.target;
      while (true) {
        if (!target.classList.contains("gear")) {
          target = target.parentElement;
        } else {
          break;
        }
      }
      clearInterval(target["int_" + target.id]);
      target["old_" + target.id] = e.targetTouches[0].screenY;
      target["o_t_" + target.id] = new Date().getTime();
      var top = target.getAttribute("top");
      if (top) {
        target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
      } else {
        target["o_d_" + target.id] = 0;
      }
      target.style.webkitTransitionDuration = target.style.transitionDuration =
        "0ms";
    },
    //手指移动
    gearTouchMove(e) {
      e.preventDefault();
      var target = e.target;
      while (true) {
        if (!target.classList.contains("gear")) {
          target = target.parentElement;
        } else {
          break;
        }
      }
      target["new_" + target.id] = e.targetTouches[0].screenY;
      target["n_t_" + target.id] = new Date().getTime();
      var f =
        (target["new_" + target.id] - target["old_" + target.id]) *
        30 /
        window.innerHeight;
      target["pos_" + target.id] = target["o_d_" + target.id] + f;
      target.style["-webkit-transform"] =
        "translate3d(0," + target["pos_" + target.id] + "em,0)";
      target.setAttribute("top", target["pos_" + target.id] + "em");
      if (e.targetTouches[0].screenY < 1) {
        gearTouchEnd(e);
      }
    },
    gearTouchEnd(e) {
      e.preventDefault();
      var target = e.target;
      while (true) {
        if (!target.classList.contains("gear")) {
          target = target.parentElement;
        } else {
          break;
        }
      }
      var flag =
        (target["new_" + target.id] - target["old_" + target.id]) /
        (target["n_t_" + target.id] - target["o_t_" + target.id]);
      if (Math.abs(flag) <= 0.2) {
        target["spd_" + target.id] = flag < 0 ? -0.08 : 0.08;
      } else {
        if (Math.abs(flag) <= 0.5) {
          target["spd_" + target.id] = flag < 0 ? -0.16 : 0.16;
        } else {
          target["spd_" + target.id] = flag / 2;
        }
      }
      if (!target["pos_" + target.id]) {
        target["pos_" + target.id] = 0;
      }
      this.rollGear(target);
    },
    rollGear(target) {
      var _this = this;
      var d = 0;
      var stopGear = false;

      function setDuration() {
        target.style.webkitTransitionDuration = target.style.transitionDuration =
          "200ms";
        stopGear = true;
      }

      clearInterval(target["int_" + target.id]);
      target["int_" + target.id] = setInterval(function() {
        var pos = target["pos_" + target.id];
        var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
        pos += speed;
        if (Math.abs(speed) > 0.1) {
        } else {
          var b = Math.round(pos / 2) * 2;
          pos = b;
          setDuration();
        }
        if (pos > 0) {
          pos = 0;
          setDuration();
        }

        var minTop = -(target.dataset.len - 1) * 2;
        if (pos < minTop) {
          pos = minTop;
          setDuration();
        }
        if (stopGear) {
          var gearVal = Math.abs(pos) / 2;
          _this.setGear(target, gearVal);
          clearInterval(target["int_" + target.id]);
        }
        target["pos_" + target.id] = pos;
        target.style["-webkit-transform"] = "translate3d(0," + pos + "em,0)";
        target.setAttribute("top", pos + "em");
        d++;
      }, 30);
    }
  }
};
</script>

<style scoped>
.mobileSelect {
  position: relative;
  z-index: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}
.mobileSelect .grayLayer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #eee;
  background: rgba(0, 0, 0, 0.7);
  z-index: 888;
  display: block;
}
.mobileSelect .content {
  width: 100%;
  display: block;
  position: fixed;
  z-index: 889;
  color: black;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  bottom: -350px;
  left: 0;
  background: white;
}
.btn_box {
  border-bottom: 1px solid #dcdcdc;
  height: 45px;
  position: relative;
  text-align: center;
  line-height: 45px;
}
.cancel {
  height: 45px;
  width: 55px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  color: #666;
}

.finish {
  position: absolute;
  top: 0;
  right: 0;
  color: #1e83d3;
  height: 45px;
  width: 55px;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}

.fade-enter,
.fade-leave-to {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.area_roll {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: transparent;
  -webkit-mask: -webkit-gradient(
    linear,
    0% 50%,
    0% 100%,
    from(#debb47),
    to(rgba(36, 142, 36, 0))
  );
  -webkit-mask: -webkit-linear-gradient(top, #debb47 50%, rgba(36, 142, 36, 0));
}

.area_roll > div {
  font-size: 1.2em;
  height: 10em;
  float: left;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.area_roll > div .gear {
  width: 100%;
  float: left;
  position: absolute;
  z-index: 9902;
  margin-top: 4em;
}

.area_roll_mask {
  -webkit-mask: -webkit-gradient(
    linear,
    0% 40%,
    0% 0%,
    from(#debb47),
    to(rgba(36, 142, 36, 0))
  );
  -webkit-mask: -webkit-linear-gradient(
    bottom,
    #debb47 50%,
    rgba(36, 142, 36, 0)
  );
  padding: 0;
}

.area_grid {
  position: relative;
  top: 4em;
  width: 100%;
  height: 2em;
  margin: 0;
  box-sizing: border-box;
  z-index: 0;
  border-top: 1px solid #abaeb5;
  border-bottom: 1px solid #abaeb5;
}

.area_roll > div:nth-child(3) .area_grid > div {
  left: 42%;
}
.tooth {
  height: 2em;
  line-height: 2em;
  text-align: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
}
.mobileSelect-show {
  opacity: 1;
  z-index: 10000;
  visibility: visible;
}
.mobileSelect-show .content {
  bottom: 0;
}
</style>
