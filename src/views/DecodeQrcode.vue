<template>
  <div class="decodeQrcode">
    <h1>DecodeQrcode</h1>
    <p class="error">{{ error }}</p>
    <p>
      Track function:
      <el-select v-model="selected" placeholder>
        <el-option v-for="item in options" :key="item.text" :label="item.text" :value="item.text"></el-option>
      </el-select>
    </p>
    <p class="decode-result">
      Result:
      <b>{{ result }}</b>
    </p>

    <qrcode-stream
      v-if="this.selected == 'Camera'"
      :track="this.paintGreenText"
      @decode="onDecode"
      @init="onInit"
    />

    <qrcode-capture v-else-if="this.selected == 'Upload'" @decode="onDecode" />
  </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "decodeQrcode", 
  components: {
    QrcodeStream,
    QrcodeCapture
  },
  data() {
    const options = [{ text: "Camera" }, { text: "Upload" }];
    const selected = options[2];
    return {
      result: "",
      error: "",
      options,
      selected
    };
  },
  methods: {
    onDecode(result) {
      this.result = result;
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    paintGreenText(location, ctx) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      } = location;

      const pointArray = [
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      ];

      const centerX = pointArray.reduce((sum, { x }) => x + sum, 0) / 4;
      const centerY = pointArray.reduce((sum, { y }) => y + sum, 0) / 4;

      ctx.font = "bold 24px sans-serif";
      ctx.textAlign = "center";

      ctx.lineWidth = 3;
      ctx.strokeStyle = "#35495e";
      ctx.strokeText(this.result, centerX, centerY);

      ctx.fillStyle = "#5cb984";
      ctx.fillText(this.result, centerX, centerY);
    }
  }
};
</script>
