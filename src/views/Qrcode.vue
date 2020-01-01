<template>
  <div class="about">
    <h1>QRCode</h1>
    <input
      type="text"
      v-model="inputCode"
      class="nes-input is-success"
      placeholder="Your Name/Websites"
    />
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="form" label-position="left" label-width="80px">
          <el-form-item label="CorrectLevel">
            <el-select v-model="form.correctLevel" placeholder="Choose correctLevel">
              <el-option v-for="item in correctLevelList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Size">
            <el-slider v-model="form.size" :step="50" :min="100" :max="500"></el-slider>
          </el-form-item>
          <el-form-item label="Color">
            <el-color-picker v-model="form.color" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="Logo">
            <input type="file" ref="logo" accept="image/*" @change="getLogo" style="display:none" />
            <el-button @click="logoInputRef">ChooseLogo</el-button>
          </el-form-item>
          <el-form-item label="Background">
            <input type="file" ref="background" accept="image/*" @change="getBackground" style="display:none" />
            <el-button @click="backgroundInputRef">ChooseBack</el-button>
          </el-form-item>
        </el-form>
        <el-row></el-row>
      </el-col>
      <el-col :span="12">
        <vue-qr
          :text="inputCode"
          :callback="test"
          :size="form.size"
          :correctLevel="form.correctLevel"
          :colorDark="form.color"
          :logoSrc="form.logo"
          :bgSrc="form.background"
          v-show="inputCode !== ''"
        ></vue-qr>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueQr from "@/components/vue-qr/src/packages/vue-qr";

export default {
  name: "Qrcode",
  components: { VueQr },
  data() {
    return {
      instance: null,
      inputCode: "",
      form: {
        size: 100,
        correctLevel: 0,
        color: "rgba(19, 206, 102, 0.8)",
        logo: "",
        background: ""
      },
      correctLevelList: [0, 1, 2, 3]
    };
  },
  mounted() {},
  methods: {
    test(dataUrl, id) {
      console.log(dataUrl, id);
    },
    getLogo(e) {
      const logo = e.target.files[0];
      this.form.logo = URL.createObjectURL(logo);
    },
    logoInputRef() {
      this.$refs.logo.click();
    },
    getBackground(e) {
      const background = e.target.files[0];
      this.form.background = URL.createObjectURL(background);
    },
    backgroundInputRef() {
      this.$refs.background.click();
    }
  },
  destroyed() {}
};
</script>

<style lang='less'>
img {
  box-shadow: 2px 2px 5px #888888;
}
.el-row {
  margin: 30px;
}
</style>