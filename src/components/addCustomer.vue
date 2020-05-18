<template>
    <div id="addCustomer" class="addCustomer">

    <el-button @click="openCityPicker" class="button">请选择 省/市/区</el-button>

  <div class="text">
   {{addressList||'省/市/区'}}
  </div>


        <!-- 地区选择器 -->
       <vue-picker :show="isShowSelect" 
       :provincesData="provinces" :citiesData="cities" :districtsData="districts"
       @provincesID="provincesID"
       @citiesID="citiesID"
       v-on:cancel="close" v-on:confirm="confirmFn"></vue-picker>
 
    </div>


</template>

<script>
import service from "../service";
import config from "../config";
import VuePicker from "@/Components/VuePickers";
// import { provs_data, citys_data, dists_data } from "vue-pickers/lib/areaData";

export default {
  name: "addCustomer",
  // components
  components: {
    vuePicker: VuePicker
  },
  data() {
    return {
      isShowSelect: false,
      provinces: [],
      cities: [],
      districts: [],
      addressList: ""
    };
  },

  created: function() {
    this.getProByGrade();
    console.log(this.cities);
  },

  methods: {
    // 省市区选择器
    //    获取省
    getProByGrade: function() {
      service.getHnAreaByGrade(
        {
          grade: 0
        },
        res => {
          if (res.data.status == "00000") {
            res.data.data.forEach((item, index) => {
              this.provinces.push({
                code: item.ztCode,
                value: item.name,
                id: item.id
              });
            });
            this.getCityByGrade(this.provinces[0].id);
            // this.citysData["default"] = this.citysData[0];
          }
        }
      );
    },
    //    获取市
    getCityByGrade: function(parentId) {
      service.getHnAreaByGrade(
        {
          grade: 1,
          parentId: parentId
        },
        res => {
          if (res.data.status == "00000") {
            if (res.data.data.length > 0) {
              res.data.data.forEach((item, index) => {
                this.cities.push({
                  code: item.ztCode,
                  value: item.name,
                  id: item.id
                });
              });
              this.getDistrictbyGrade(this.cities[0].id);
            }
          }
        }
      );
    },
    // //    获取区
    getDistrictbyGrade: function(parentId) {
      service.getHnAreaByGrade(
        {
          grade: 2,
          parentId: parentId
        },
        res => {
          if (res.data.status == "00000") {
            res.data.data.forEach((item, index) => {
              this.districts.push({
                code: item.ztCode,
                value: item.name,
                id: item.id
              });
            });
          }
        }
      );
    },
    provincesID: function(val) {
      if (val) {
        this.$nextTick(() => {
          this.cities = [];
          this.districts = [];
          this.getCityByGrade(val);
        });
      }
    },
    citiesID: function(val) {
      if (val) {
        this.$nextTick(() => {
          this.districts = [];
          this.getDistrictbyGrade(val);
        });
      }
    },

    //   选择器按钮
    openCityPicker: function() {
      this.isShowSelect = true;
    },
    close: function() {
      this.isShowSelect = false;
    },
    confirmFn: function(res) {
      var select1 = "",
        select2 = "",
        select3 = "";
      select1 = res.select1.value;
      if (res.select2) {
        select2 = res.select2.value;
      }
      if (res.select3) {
        select3 = res.select3.value;
      }
      this.addressList = select1 + " " + select2 + " " + select3;
      this.isShowSelect = false;
    }
  }
};
</script>

<style scoped>
.addCustomer{
  padding: 15px;
}
.button{
  width: 100%;
}
.text{
  padding-top:10px;
}
</style>
