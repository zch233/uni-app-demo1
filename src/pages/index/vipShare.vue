<template>
	<view class="content">
		<image mode='widthFix' class="vipCodeBg" src="/static/img/vipShareCodeBg.png"></image>
		<image mode='widthFix' class="qrcode" :src="qrcode"></image>
    <button class="saveButton" @tap="saveQRCode">保存到本地</button>
    <uniPopup ref="popup" :maskClick="false">
			<view class="content-couponWrapper">
				<view class="content-couponTitle">升级会员好礼！</view>
				<scroll-view class="content-couponList" scroll-y scroll-with-animation style="height: 100%;width: 100%;">
          <view class="content-couponList-item" v-for="item in couponList" :key="item.id">
            <view class="content-couponList-item-left">
              <view class="content-couponList-item-left-price">￥<text>{{ item.coupon_price }}</text></view>
              <view class="content-couponList-item-left-tips">全场通用</view>
            </view>
            <view class="content-couponList-item-right">
              <view class="content-couponList-item-right-title">{{ item.coupon_name }}</view>
              <view class="content-couponList-item-right-tips">满{{ item.condition }}元使用</view>
              <view class="content-couponList-item-right-time">{{ item.coupon_start_time }}-{{ item.coupon_end_time }}</view>
            </view>
          </view>
        </scroll-view>
			</view>
			<view @click="$refs.popup.close()" class="content-couponButton">确认</view>
		</uniPopup>
	</view>
</template>

<script>
  import uniPopup from 'components/uni-popup/uni-popup.vue'
  import { getQRCode, getCouponList } from '@/api/user'

	export default {
    components: { uniPopup },
		data () {
			return {
				qrcode: '/static/img/qrcode.png',
				couponList: []
			}
		},
    onLoad() {
			this.getQRCode()
			this.getShareCoupon()
		},
		methods: {
			async getShareCoupon () {
        const [error , { data }] = await getCouponList({ status: 1, page_size: 999 })
        if (error) {
          uni.showToast({ icon: 'none', title: '获取优惠券失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				this.couponList = data.data.data.map(v => {
					v.coupon_start_time = new Date(v.coupon_start).toLocaleDateString().replace(/\//g, ".")
					v.coupon_end_time = new Date(v.coupon_end).toLocaleDateString().replace(/\//g, ".")
					return v
				})
				if (this.couponList.length > 0) {
					this.$refs.popup.open()
				}
			},
			async getQRCode () {
        uni.showLoading({ title: '正在生成分享' });
        const [error , { data }] = await getQRCode()
        uni.hideLoading();
        if (error) {
          uni.showToast({ icon: 'none', title: '分享生成失败' })
          return
        }
        if (data.code !== 'success') {
					uni.showToast({ icon: 'none', title: data.msg })
					return
				}
				this.qrcode = data.data.img
			},
			saveQRCode () {
				const aa = wx.getFileSystemManager();
				aa.writeFile({
					filePath: `${wx.env.USER_DATA_PATH}/qrcode.png`,
					data: this.qrcode.slice(22),
					encoding: 'base64',
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: `${wx.env.USER_DATA_PATH}/qrcode.png`,
							success: function (res) {
								uni.showToast({ title: '保存成功'})
							},
							fail: function (err) {
								uni.showToast({ icon: 'none', title: '保存失败' })
							}
						})
					}, fail: err => {
						console.log(err)
					}
			 })
			}
		},
	}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: rgb(31, 33, 35);
  background-image: url('~@/static/img/vipShareBg.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  .vipCodeBg {
    width: 446rpx;
    position: absolute;
    top: 291rpx;
    left: 50%;
    transform: translateX(-50%);
  }
	.qrcode {
		width: 292rpx;
		position: absolute;
    top: 358rpx;
    left: 50%;
		border-radius: 50%;
    transform: translateX(-50%);
	}
  .saveButton {
    position: absolute;
    top: 993rpx;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(228, 174, 129);
    padding: 49rpx 158rpx;
    line-height: 1;
    border-radius: 10rpx;
    white-space: nowrap;
    color: #333;
    font-size: 36rpx;

  }
  &-couponWrapper {
		width: 622rpx;
		height: 778rpx;
		color: #BEA26F;
		background-image: url('~@/static/img/vipCouponBg2.png');
		background-repeat: no-repeat;
		background-size: cover;
		padding: 86rpx 53rpx 9rpx;
		position: relative;
		box-sizing: border-box;
	}
	&-couponWrapper::before {
		content: '';
		position: absolute;
		width: 691rpx;
		background-image: url('~@/static/img/vipCouponBg1.png');
		background-repeat: no-repeat;
		background-size: cover;
		height: 538rpx;
		top: -50rpx;
		left: -33rpx;
		z-index: 2;
	}
	&-couponTitle {
		position: absolute;
		top: -14rpx;
		left: -14rpx;
		color: #7D582C;
		font-size: 36rpx;
		width: 100%;
		height: 159rpx;
		background-image: url('~@/static/img/vipCouponBg3.png');
		background-repeat: no-repeat;
		background-size: cover;
		padding-top: 1em;
		box-sizing: border-box;
    text-align: center;
		z-index: 1;
	}
	&-couponList {
		width: 100%;
		height: 100%;
    box-sizing: border-box;
		white-space: nowrap;
		-webkit-overflow-scrolling : touch;
    &-item {
      box-sizing: border-box;
      width: 100%;
      margin: 0 auto 50rpx;
			overflow: hidden;
			position: relative;
			z-index: 0;
			display: flex;
			line-height: 1;
			align-items: center;
			padding: 4px;
			background-image: url('~@/static/img/vipCouponBg.png');
			background-repeat: no-repeat;
			background-size: 100%;
			&-left {
				padding: 56rpx 12rpx 58rpx 0;
				color: #7D582C;
				font-size: 30rpx;
				text-align: center;
				&-price {
					color: #DCB17E;
					font-size: 55rpx;
					margin-bottom: 6rpx;
					text {
						font-size: 110rpx;
						font-weight: 400;
						margin-left: -6rpx;
					}
				}
			}
			&-right {
				padding-left: 16rpx;
				&-title {
					font-size: 36rpx;
					color: #7D582C;
					margin-top: 16rpx;
				}
				&-tips {
					font-size: 30rpx;
					color: #C09E77;
					margin: 14rpx 0 20rpx;
				}
				&-time {
					font-size: 24rpx;
					color: #C09E77;
					white-space: nowrap;
				}
			}
    }
	}
	&-couponButton {
		color: #fff;
		background-color: rgb(211, 170, 125);
		border: 2rpx solid rgb(196, 123, 69);
		box-shadow: 0 0 0 10rpx rgb(211, 170, 125);
		border-radius: 89rpx;
		font-size: 36rpx;
		line-height: 2;
		width: 60%;
		margin: 0 auto;
		margin-top: 40rpx;
    text-align: center;
	}
}
</style>
