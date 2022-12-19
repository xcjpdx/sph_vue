<template>
  <div>
    <!--banner轮播-->
    <swiper :options="swiperOptions">
      <swiper-slide
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: defaultIndex == index }"
          @click="changeDefaultImg(index)"
        />
      </swiper-slide>
      <div class="swiper-button-next swiper-button" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button" slot="button-prev"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      /* 默认选中的图片 */
      defaultIndex: 0,
      /* swiper配置 */
      swiperOptions: {
        slidesPerView: 4,
        slidesPerGroup: 2,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    //改变默认图片的索引
    changeDefaultImg(newIndex) {
      //相等,则不改变,不等于则改变
      if (newIndex != this.defaultIndex) {
        this.defaultIndex = newIndex;
        //改变Zoom当中的图片
        this.$bus.$emit("changeDefaultIndex", newIndex);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    //这里设置其实没有用的,因为后面会自动计算,比如slidesPerView来动态分配
    // width: 56px;
    // height: 56px;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
