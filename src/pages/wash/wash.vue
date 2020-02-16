<template>
	<view class="content">
		<swiper :indicator-dots="true">
      <swiper-item>
        <image mode='widthFix' class="swiperImg" src="/static/img/swiper.png"></image>
      </swiper-item>
      <swiper-item>
        <image mode='widthFix' class="swiperImg" src="/static/img/swiper.png"></image>
      </swiper-item>
      <swiper-item>
        <image mode='widthFix' class="swiperImg" src="/static/img/swiper.png"></image>
      </swiper-item>
    </swiper>
    <view class="product-list">
      <view class="product-list-item" v-for="item in goodList" :key="item.id">
        <image mode='widthFix' class="product-list-item-img" src="/static/img/good.png"></image>
        <view class="product-list-item-info">
          <view class="product-list-item-info-title">{{ item.title }}</view>
          <view class="product-list-item-info-des">{{ item.desc }}</view>
          <view class="product-list-item-info-des">好评率：100%</view>
          <view class="product-list-item-info-priceBar">
            <view class="product-list-item-info-priceBar-price">￥<text>{{ item.discounted_price }}</text></view>
            <view class="product-list-item-info-priceBar-countBar">
              <image mode='widthFix' @tap="calculate(item, 'minus')" v-show="item.num > 0" class="product-list-item-info-priceBar-countBar-minus" src="/static/img/minus.png"></image>
              <view class="product-list-item-info-priceBar-countBar-count" v-show="item.num > 0">{{ item.num }}</view>
              <image mode='widthFix' @tap="calculate(item, 'add')" class="product-list-item-info-priceBar-countBar-add" src="/static/img/add.png"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="totalBar">
      <image class="totalBar-img" mode='widthFix' src="/static/img/totalBg.png"></image>
      <view class="totalBar-total">{{ totalCount }}</view>
      <view class="totalBar-info">
        <view class="totalBar-info-tips">共选择{{ totalCount }}件</view>
        <view class="totalBar-info-price">￥{{ totalPrice }}</view>
      </view>
      <view class="totalBar-button" :class="{disabled: totalCount <= 0 || totalPrice <= 0}" @click="settleOrder">去结算</view>
    </view>
	</view>
</template>

<script>
  import { getGoodList, createOrder } from '@/api/wash.js';
  import { mapMutations } from 'vuex'

	export default {
    data () {
      return {
        goodList: [],
      }
    },
    computed: {
      totalCount () {
        return this.goodList.map(v => v.num).reduce((a, b) => a + b, 0 )
      },
      totalPrice () {
        return this.goodList.map(v => Number((v.num * v.discounted_price).toFixed(2))).reduce((a, b) => a + b, 0 )
      }
    },
    onLoad () {
      this.getGoodList()
    },
    methods: {
      ...mapMutations(['setOrderGoodList']),
      async getGoodList (refresh) {
        uni.showLoading({ title: '正在获取商品' });
        const [error, { data }] = await getGoodList()
        if (refresh) uni.stopPullDownRefresh()
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
        }
        this.goodList = this.handleGoodListData(data.data.data)
        uni.hideLoading();
      },
      handleGoodListData (data) {
        data.map(v => (v.num = 0))
        return data
      },
      calculate(product, operator) {
        if (operator === 'minus') {
          product.num -= 1
          if (product.num <= 0) {
            product.num = 0
          }
        } else if (operator === 'add') {
          product.num += 1
        }
      },
      onPullDownRefresh() {
        this.getGoodList('refresh')
      },
      async settleOrder () {
        const goods_info = {}
        this.setOrderGoodList(this.goodList.filter(v => v.num !== 0))
        this.goodList.filter(v => v.num !== 0).map(v => (goods_info[v.id] = v.num))
        uni.showLoading({ title: '正在生成订单' });
        const [error , { data }] = await createOrder({ goods_info })
        if (error) {
          uni.showToast({ icon: 'none', title: '订单生成失败' })
          return
        }
        uni.hideLoading();
        console.log({error, data})
        uni.navigateTo({ url: `/pages/wash/order?id=${data}` })
      }
    }
	}
</script>

<style lang="scss" scoped>
.swiperImg {
  width: 100%;
}
.product-list {
  padding: 30rpx;
  box-sizing: border-box;
  &-item {
    margin-bottom: 40rpx;
    display: flex;
    line-height: 1;
    &-img {
      width: 150rpx;
      padding-right: 21rpx;
    }
    &-info {
      flex: 1;
      &-title {
        color: #333333;
        font-size: 35rpx;
        margin-bottom: 18rpx;
      }
      &-des {
        color: #A3A3A3;
        font-size: 22rpx;
        margin-bottom: 8rpx;
      }
      &-priceBar {
        display: flex;
        margin-top: 20rpx;
        justify-content: space-between;
        &-price {
          color: #E21A1A;
          font-size: 22rpx;
          text {
            font-size: 30rpx;
          }
        }
        &-countBar {
          display: inline-flex;
          font-size: 30rpx;
          align-items: center;
          $r: 30rpx;
          text-align: center;
          font-weight: bold;
          &-minus {
            width: 30rpx;
          }
          &-count {
            color:#333;
            font-weight: normal;
            width: 2.2em;
            text-align: center;
          }
          &-add {
            width: 30rpx;
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.totalBar {
  position: fixed;
  left: 0;
  bottom: calc(var(--window-bottom) + 24rpx);
  width: 100%;
  display: flex;
  background-color: rgb(173, 170, 173);
  padding: 24rpx 0;
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  $imgWidth: 130rpx;
  $imgLeft: 30rpx;
  &-img {
    width: $imgWidth;
    position: absolute;
    left: 30rpx;
    bottom: $imgLeft;
  }
  &-total {
    $r: 26rpx;
    content: '';
    position: absolute;
    left: 154rpx;
    background-color: rgb(242, 26, 97);
    width: $r;
    height: $r;
    border-radius: 50%;
    top: -18rpx;
    line-height: $r;
    font-size: 18rpx;
    color: #fff;
    text-align: center;
  }
  &-info {
    padding-left: 200rpx;
    flex: 1;
    &-tips {
      margin-bottom: 22rpx;
    }
  }
  &-button {
    margin-right: 30rpx;
    background-color: rgb(242, 26, 97);
    border-radius: 16rpx;
    padding: 15rpx 40rpx;
    &.disabled {
      pointer-events: none;
      background-color: rgb(104, 104, 104);
    }
  }
}
</style>
