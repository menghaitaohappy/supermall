<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "Shopcart",
    components: {
      NavBar
    },
    computed: {
      //两种语法
      //语法1，默认名字
      // ...mapGetters(['cartLength','cartList'])
      //语法2,可以自定义名字
      ...mapGetters({length:'cartLength',list:'cartList'})

    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
