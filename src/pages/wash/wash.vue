<template>
	<view class="content">
		<swiper :indicator-dots="true" v-if="bannerList.length !== 0">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <navigator :url="item[1]">
          <image mode='widthFix' class="swiperImg" :src="imgPath + item[0]"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="product-list">
      <view class="product-list-item" v-for="item in goodList" :key="item.id">
        <image mode='widthFix' class="product-list-item-img" :src="item.image"></image>
        <view class="product-list-item-info">
          <view class="product-list-item-info-title">{{ item.title }}</view>
          <view class="product-list-item-info-des">{{ item.desc }}</view>
          <view class="product-list-item-info-des">好评率：100%</view>
          <view class="product-list-item-info-priceBar">
            <view class="product-list-item-info-priceBar-price">￥<text>{{ item.price }}</text></view>
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
  import { getGoodList, createOrder, getBanner } from '@/api/wash.js';
  import { mapState } from 'vuex'

	export default {
    data () {
      return {
        goodList: [],
        bannerList: [],
      }
    },
    computed: {
      ...mapState(['forcedLogin', 'hasLogin', 'imgPath']),
      totalCount () {
        return this.goodList.map(v => v.num).reduce((a, b) => a + b, 0 )
      },
      totalPrice () {
        return this.goodList.map(v => Number((v.num * v.price).toFixed(2))).reduce((a, b) => a + b, 0 )
      }
    },
    onLoad () {
      this.checkLoginStatus()
      this.getGoodList()
      this.getBanner()
    },
    onPullDownRefresh() {
      this.getGoodList('refresh')
    },
    methods: {
      checkLoginStatus () {
				if (!this.hasLogin) {
					uni.showModal({
						title: '未登录',
						content: '您未登录，需要登录后才能继续',
						/**
						 * 如果需要强制登录，不显示取消按钮.
						 */
						showCancel: !this.forcedLogin,
						success: (res) => {
							if (res.confirm) {
								uni.reLaunch({
									url: '../user/user'
								});
							}
						}
          });
          return false
        }
        return true
      },
      async getBanner () {
        const [error, { data }] = await getBanner()
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
        }
        this.bannerList = (data.data.image || []).filter(v => v[0])
      },
      async getGoodList (refresh) {
        uni.showLoading({ title: '正在获取商品' });
        const [error, { data }] = await getGoodList({ page_size: 999 })
        uni.hideLoading();
        if (refresh) uni.stopPullDownRefresh()
        if (error) {
          uni.showToast({ icon: 'none', title: '获取失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
        this.goodList = this.handleGoodListData(data.data.data)
      },
      handleGoodListData (data) {
        data.map(v => {
          v.num = 0
          v.image = this.imgPath + v.image
        })
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
      async settleOrder () {
        if (!this.checkLoginStatus()) return
        const goods_info = {}
        this.goodList.filter(v => v.num !== 0).map(v => (goods_info[v.id] = v.num))
        uni.showLoading({ title: '正在生成订单' });
        const [error , { data }] = await createOrder({ goods_info: JSON.stringify(goods_info) })
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '订单生成失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
        uni.navigateTo({ url: `/pages/wash/order?id=${data.data.id}` })
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
  padding-bottom: 230rpx;
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
          $r: 36rpx;
          text-align: center;
          font-weight: bold;
          &-minus {
            width: $r;
          }
          &-count {
            color:#333;
            font-weight: normal;
            width: 2.2em;
            text-align: center;
          }
          &-add {
            width: $r;
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
