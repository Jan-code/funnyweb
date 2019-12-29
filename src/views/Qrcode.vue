<template>
  <div class="about">
    <h1>This is QRCode</h1>
    <input
      type="text"
      v-model="inputCode"
      class="nes-input is-success"
      placeholder="Your Name/Websites"
      @change="resetCode"
    />
    <a href="#" class="nes-badge">
      <div ref="qrcode" id="qrcode"></div>
    </a>
  </div>
</template>

<script>
import QRCode from "qrcodejs2"; // 引入qrcode

export default {
  name: "Qrcode",
  data() {
    return {
      instance: null,
      inputCode: null
    };
  },
  mounted() {
    this.qrcode();
  },
  methods: {
    qrcode() {
      this.instance = new QRCode(this.$refs.qrcode, {
        width: 132,
        height: 132,
        text: `"https://www.google.com"`, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    resetCode() {
      this.instance.makeCode(this.inputCode); // 更换二维码内容
    },
    clear() {
      this.instance.clear();
    }
  },
  destroyed() {
    this.clear();
  }
};
</script>

<style lang='less'>
 #qrcode {
    display: inline-block;
    img {
      width: 132px;
      height: 132px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
    }
  }
</style>