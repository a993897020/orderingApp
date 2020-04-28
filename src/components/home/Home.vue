<template>
  <div class="home">
    <mu-appbar class="header" color="orange500">
      <div class="address">
        <mu-slide-picker class="addressSelect" v-show="flag" :visible-item-count="7" :values="addressList" :slots="addressSlots" @change="addressChange"></mu-slide-picker>
      </div>
      <p @click="select" class="text">{{addressItem}}
        <i class="material-icons">
          arrow_drop_down
        </i>
      </p>
      <div class="search">
        <input type="text" placeholder="搜索菜名或者商家" class="search-input">
        <i class="material-icons search-icon">
          search
        </i>
      </div>
      <div class="icon">
      </div>
    </mu-appbar>
    <div class="wrapper" ref="homeScroll">
      <div class="wrapper-scroll">
        <mu-carousel class="img-wrapper" hide-controls hide-indicators>
          <mu-carousel-item class="img-item">
            <img src="../../assets/1.jpg" alt="">
          </mu-carousel-item>
          <mu-carousel-item class="img-item">
            <img src="../../assets/2.jpg" alt="">
          </mu-carousel-item>
          <mu-carousel-item class="img-item">
            <img src="../../assets/3.jpg" alt="">
          </mu-carousel-item>
          <mu-carousel-item class="img-item">
            <img src="../../assets/4.jpg" alt="">
          </mu-carousel-item>
        </mu-carousel>
        <mu-container>
          <mu-tabs :value.sync="active" center text-color="rgba(0, 0, 0, .54)" color="secondary" inverse>
            <mu-tab>
              <mu-icon value="menu" class="tab-item"></mu-icon>
              菜单
            </mu-tab>
            <mu-tab>
              <mu-icon value="whatshot" class="tab-item"></mu-icon>
              热门
            </mu-tab>
          </mu-tabs>
        </mu-container>
        <div class="line"></div>
        <!-- 菜单 -->
        <div class="food-wrapper" v-show="this.active==0">
          <ul class="food-class">
            <li class="food-class-item" v-for="(classify,index) in this.foods" :key="index" v-show="index!==0">
              <img src="../../assets/classicon.png" alt="">
              {{classify.name}}
              <ul class="food-content">
                <li class="food-content-item" v-for="(food,index) in classify.spus" :key="index" @click="newPage(food)">
                  <img :src="food.picture">
                  <div class="food-text-top">
                    <span>{{food.name}}</span>
                    <span>{{food.score.star}}</span>
                  </div>
                  <div class="food-text-bottom">
                    <span>￥{{food.min_price}}</span>
                    <span>{{food.month_saled_content}}</span>
                  </div>

                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- 热门 -->
        <div class="food-wrapper" v-show="this.active==1">
          <ul class="food-class">
            <li class="food-class-item" v-for="(classify,index) in this.foods" :key="index" v-show="index==0">
              <img src="../../assets/classicon.png" alt="">
              {{classify.name}}
              <ul class="food-content">
                <li class="food-content-item" v-for="(food,index) in classify.spus" :key="index" @click="newPage(food)">
                  <img :src="food.picture">
                  <div class="food-text-top">
                    <span>{{food.name}}</span>
                    <span>{{food.score.star}}</span>
                  </div>
                  <div class="food-text-bottom">
                    <span>￥{{food.min_price}}</span>
                    <span>{{food.month_saled_content}}</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
    <!-- 商品详情 -->
    <app-details :food="details" ref="details"></app-details>
  </div>
</template>

<script>
const addressList = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
}
// import Mock from 'mockjs'
import Vue from 'vue'
import BScorll from 'better-scroll'
import Footer from '../footer/Footer'
import Details from '../details/Details'
var Mock = require('mockjs')

export default {
  inject: ['reload'],
  components: {
    'app-footer': Footer,
    'app-details': Details
  },
  data() {
    return {
      addressSlots: [
        {
          width: '100%',
          textAlign: 'right',
          values: Object.keys(addressList)
        },
        {
          width: '100%',
          textAlign: 'left',
          values: ['北京']
        }
      ],
      addressList: ['北京', '北京'],
      addressProvince: '北京',
      addressCity: '北京',
      flag: false,    //address地区选中
      shift: 'home', //底部导航active
      foods: {},    //foods数据内容
      active: 0,    //tab页面切换   0是菜单   1是热门
      homeScroll: {},
      isLoading: false,
      ing: true,
      dropDown: false,
      details: {}
    }
  },
  updated() {
    this.homeScroll = new BScorll(this.$refs.homeScroll,//Y轴滚动
      {
        click: true,
        scrollY: true,
        probeType: 3,
      })
  },
  created() {
    this.http.get('http://json.apiopen.top/gGoods')                  //从接口获取数据
      .then((res => {
        if (res.data.code == 200) {
          this.foods = res.data.result.food_spu_tags
          this.foods.forEach(item => {
            item.spus.forEach(food => {
              var star = Mock.mock({
                "star|3-5": "★"
              })
              Vue.set(food, 'score', star)   //数据中每个food没有评分,使用mock来模拟数据score,Vue.set添加score数据
            })
          });
        }
      }))
      .catch((error) => {
        console.log(error)
      })
    this.$nextTick(() => {
      this.homeScroll = new BScorll(this.$refs.homeScroll,//Y轴滚动
        {
          click: true,
          scrollY: true,
          probeType: 3,
        })
      this.homeScroll.on('scroll', (pos) => {   //向上滑动刷新
        if (pos.y> 0) {
          this.homeScroll.scrollTo(0,0,0)
        }   
      })
    })
  },
  // mounted(){
  //    var data=Mock.mock({
  //         "star|3-5": "★"
  //   })

  //   console.log(data)

  // },
  methods: {
    /**
     * 选择地址
     */
    addressChange(value, index) {
      switch (index) {
        case 0:
          this.addressProvince = value;
          const arr = addressList[value];
          this.addressSlots[1].values = arr
          this.addressCity = arr[0]
          break;
        case 1:
          this.addressCity = value;
          break;
      }
      this.addressList = [this.addressProvince, this.addressCity]
      // console.log(value,index)
    },
    select() {
      this.flag = !this.flag;
    },
    /**
     * 点击显示商品详情
     */
    newPage(food) {
      //  console.log(food)

      this.details = food;
      this.$refs.details.showView()
    },

  },
  computed: {
    addressItem() {
      if (this.addressProvince === this.addressCity) {
        return this.addressProvince
      } else {
        return this.addressProvince + "  " + this.addressCity
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
  overflow: hidden;
  position: fixed;
  height: 100%;
  width: 100%;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    .mu-appbar {
      z-index: 3;
      overflow: hidden;
      background-color: orange;
    }
    .address {
      width: 150px;
      height: 180px;
      margin-left: -12px;
      position: fixed;
      left: 0;
      top: 50px;
      overflow: hidden;
      z-index: -1;
      // background-color: #ccc;
      .addressSelect {
      }
    }
    .text {
      color: #fff;
      position: fixed;
      left: 10px;
      top: 15px;
      z-index: 5;
      width: 110px;
      height: 50px;
      font-size: 12px;
      line-height: 50px;
    }
    .material-icons {
      vertical-align: middle;
      margin-left: -5px;
    }
    .search {
      width: 100%;
      padding: 0 50px 0 65px;
      position: relative;
      left: 0;
      top: 0;
      height: 50px;
      line-height: 50px;
      .search-input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 0;
        outline: none;
        // padding: 0 35px;
        text-indent: 3em;
        font-size: 12px;
        box-sizing: border-box;
      }
      .search-icon {
        position: absolute;
        left: 80px;
        top: 50%;
        height: 30px;
        margin-top: -5px;
        color: #999;
        font-size: 20px;
      }
    }
    .icon {
      width: 50px;
      height: 45px;
      background-image: url("../../assets/icon.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: fixed;
      right: 10px;
      top: 20px;
    }
  }
  .wrapper {
    width: 100%;
    height: 80%;
    .wrapper-scroll {
        padding-bottom: 20px;
      .img-wrapper {
        margin-top: 81px;
        height: 200px;
        .img-item {
          width: 100%;
          height: 200px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .line {
        width: 100%;
        height: 10px;
        background: rgba(0, 0, 0, 0.1);
      }
      .food-wrapper {
        width: 100%;
        .food-class {
          padding: 20px;
          .food-class-item {
            // border: 1px solid #000;
            margin-bottom: 10px;
            img {
              width: 5px;
              height: 20px;
              vertical-align: top;
            }
            .food-content {
              width: 100%;
              .food-content-item {
                width: 50%;
                display: inline-block;
                vertical-align: top;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 31.25vw;
                }
                .food-text-top {
                  font-size: 12px;
                  text-align: center;
                  padding-bottom: 5px;
                  span:first-child {
                    width: 50%;
                  }
                  span:last-child {
                    width: 50%;
                    padding-left: 15px;
                    color: rgba(225, 152, 0, 1);
                  }
                }
                .food-text-bottom {
                  font-size: 12px;
                  text-align: center;
                  span:first-child {
                    padding-right: 15px;
                    color: red;
                  }
                  span:last-child {
                    color: rgba(225, 152, 0, 1);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
