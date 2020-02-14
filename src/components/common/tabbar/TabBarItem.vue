<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeBcColor">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'orangered'
      },
      bcColor: {
        type: String,
        default: 'aliceblue'
      }
    },
    data() {
      return {}
    },
    computed: {
      isActive() {
        // return this.$route.path===this.path;
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {};
      },
      activeBcColor(){
        return this.isActive?{background:this.bcColor}:{}
      }
    },
    methods: {
      itemClick() {
        if (this.$route.path !== this.path) { //防止点击多次
          this.$router.replace(this.path);
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    height: 20px;
    width: 20px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
