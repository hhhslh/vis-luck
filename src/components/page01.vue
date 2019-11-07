<template>
  <div class="outMain">
      <div class="main">
      <!-- <h1 class="title">抽奖活动</h1> -->
      <p class="title">
        <img src="../assets/2.png" alt="">
      </p>
          <div class="lottery">
            <div class="inlottery">
              <ul :style="lotterySize">
                <li v-for="(item,index) in peopleList" :key="index">
                    <img :src="item.index04" alt="" style="margin-right:30px;">
                    <span>{{item.index03}}</span>
                </li>
              </ul>
            </div>
            <div class="redline" :class="isShow?'show':'hide'">
              <img width="40" src="../assets/jiantou2.png" alt="" class="jiantou">
            </div>
          </div>
      </div>
      <div class="bottomBtn">
        <!-- <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader> --> 
        <el-button @click="lotteryStatusFun" @keyup.enter="searchEnterFun">{{lotteryStatus}}</el-button>
      </div>
      <!-- <ul class="hrefList"> -->
        <!-- <li style="top:40%"><a href="http://data.xinxueshuo.cn/nsi-event/event/annual/card.html">扫一扫</a></li> -->
        <!-- <li style="top:50%"><a href="http://data.xinxueshuo.cn/nsi-event/event/annual/contest.html">摇一摇</a></li> -->
        <!-- <li style="top:60%"><a href="#">抽奖</a></li> -->
	    <!-- </ul> -->
  </div>
</template>

<script>
import {getred,getblue} from "../api/api"
export default{
  data(){
    return{
      wranClick:false,//避免恶性点击
      peopleList:[],//存储抽奖人
      peopleListAll:[],
      peopleListBlue:[],
      peopleListRed:[],
      lotteryStartFun:'',//开始时间函数
      lotteryendFun:'',//结束时间函数
      lotterySize:'top:0;',//css控制
      lotteryNum:0,//总长度
      lotteryTime:5,//单位时间
      lotteryLength:10,//单位长度
      lotteryStatus:'开始',
      lotteryStatusBoolean:false,//抽奖状态
      options:[{
              value: 'all',
              label: '全部',
              },{
                value: 'red',
                label: '红队',
              },{
                value: 'blue',
                label: '蓝队',
              }],
      selectedOptions:['all'],
      isShow:false,
    }
  },
  methods:{
    //控制
    lotteryStatusFun(){
      if(!this.lotteryStatusBoolean){
        if(this.wranClick){
            return
        }
      }
      this.lotteryStatusBoolean=!this.lotteryStatusBoolean
      if(this.lotteryStatusBoolean){
        this.lotteryStatus='暂停'
        this.isShow=false
        this.lotteryStart()
      }else{
        this.lotteryStatus='开始'
        this.isShow=true
        this.lotteryStop()
      }
    },
    // 回车控制
    // searchEnterFun(e){
    //     var keyCode = window.event? e.keyCode:e.which;
    //     if(keyCode == 13){
    //     }
    // },
    searchEnterFun(){
        var that=this
        document.onkeydown = function (e) {
            var key = window.event? e.keyCode:e.which;
            if (key == 13) {
                if(!that.lotteryStatusBoolean){
                    if(that.wranClick){
                        return
                    }
                }
                that.lotteryStatusBoolean=!that.lotteryStatusBoolean
                if(that.lotteryStatusBoolean){
                    that.lotteryStatus='暂停'
                    that.isShow=false 
                    that.lotteryStart()
                }else{
                    that.lotteryStatus='开始'
                    that.isShow=true
                    that.lotteryStop()
                }
            }
        };
    },
    //开始抽奖
    lotteryStart(){
      let that=this
      that.wranClick=true
      that.lotteryNum=0
      that.lotteryTime=5
      that.lotteryStartFun=setInterval(function(){
        that.lotteryNum=that.lotteryNum+that.lotteryLength
        if(that.lotteryNum>(that.peopleList.length-that.lotteryLength)*90){
          that.lotteryNum=0
        }
        that.lotterySize='top:-'+that.lotteryNum+'px;'
      },that.lotteryTime)
    },
    //停止抽奖
    lotteryStop(){
      let that=this
      clearInterval(that.lotteryStartFun)
      let endNum=(Math.ceil(that.lotteryNum/90)+10)*90
      let cha=endNum%((that.peopleList.length-that.lotteryLength)*90)
      that.lotteryendFun=setInterval(function(){
        that.lotteryNum=that.lotteryNum+that.lotteryLength
        if(that.lotteryNum>(that.peopleList.length-that.lotteryLength)*90){
          that.lotteryNum=0
        }
        that.lotterySize='top:-'+that.lotteryNum+'px;'
        if(that.lotteryNum==cha){
          clearInterval(that.lotteryendFun)
          that.wranClick=false
        }
      },that.lotteryTime)
    },
    //改变抽奖人员
    handleChange(value) {
      this.lotteryNum=0
      this.lotterySize='top:-'+this.lotteryNum+'px;'
      var that=this
        if(value[0]=='red'){
          that.peopleList=that.peopleListRed
        }else if(value[0]=='all'){
          that.peopleList=that.peopleListAll
        }else if(value[0]=='blue'){
          that.peopleList=that.peopleListBlue
        }
    }
  },
  //获取数据
  created(){
     this.searchEnterFun()
    let that=this
    // getBlue({
    //     camp:'红'
    // }).then(response=>{
    //     console.log(response.data)
    //     that.peopleListRed=response.data
    //     for (var i = 0; i < 5; i++) {
    //         that.peopleListRed.push(that.peopleListRed[i])
    //     };
    // })
    getblue({
        camp:'蓝'
    }).then(response=>{
        that.peopleListBlue=response.data
        that.peopleListAll=that.peopleListRed.concat(that.peopleListBlue)
        for (var i = 0; i < 5; i++) {
            that.peopleListBlue.push(that.peopleListBlue[i])
            that.peopleListAll.push(that.peopleListBlue[i])
        };
        that.peopleList=that.peopleListAll
    })
  },
}
</script>

<style lang="scss">
.hrefList{
  li{
    position: fixed;
    left: 0;
    border: 1px solid #a5a5a5;
    text-align: center;
    border-radius: 0 10px 10px 0;
    height: 30px;
    line-height: 30px;
    width: 60px;
    a{
      color:#a5a5a5;
		  text-decoration: none;
    }
  }
}
.title{
  img{
    width:700px;
    height: 260px;
    margin: 0 auto;
    display: block;
  }
}
ul,li{
  list-style: none;
  padding:0;
  margin:0;
}
.outMain{
  width: 100%;
  height: 100%;
  background:url('../assets/bg.png');
  background-position: center center;
  background-size: cover;
}
.main{
  padding-top:20px;
  width: 60%;
//   height: 100%;
  margin:0px auto;
}
.lottery{
  width: 500px;
  position:relative;
  margin:30px auto;
  margin-top: 0;
  .inlottery{
      height: 470px;
      overflow: hidden;
      position:relative;
      border-radius: 4px;
      background: linear-gradient(180deg,#d63031, #ff7675);
      box-shadow: 0 5px 10px #232323;
  }
  ul{
    position:absolute;
    width: 100%;
    padding-left: 30px;
    top:0;
    left:0;
    // background: rgba(216, 53, 20, 0.8);
    // background: linear-gradient(180deg,rgba(180, 44, 17,.9), rgba(222, 109, 86,.8));
    z-index: 99;
    li{
        display:flex;
        align-items:center;
        // justify-content:left;
        justify-content:left;
        margin:20px 0;
        background: #d83435;
        width: 85%;
        border-radius: 5px;
        padding:10px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        span{
          color:#fff;
        }
    }
  }
  .redline{
    position:absolute;
    top: 190px;
    width: 445px;
    height: 70px;
    left: 20px;
    z-index: 99;
    border: 10px solid #ffb129;
    border-radius: 4px;
    // box-shadow: 0 5px 10px #272727;
    .jiantou{
      position: absolute;
      right: 30px;
      top: 15px;
      z-index: 99
    }
  }
}
.bottomBtn{
    position: absolute;
    left: 2%;
    bottom: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button{
        border:none;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        padding: 0;
        font-size: 22px;
        font-weight: 600;
        z-index: 99;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        &:hover{
            color: #409EFF;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
            cursor: pointer;
        }
    }
  .el-cascader{
    padding-right:20px;
  }
  .el-input{
    width: 40%;
    position: relative;
  }
  .el-cascader{
    position: relative;
    right: -100px;
    top: 20px;
  }
}
.hide{
    display: none;
}
.show{
    display: block;
}
</style>
