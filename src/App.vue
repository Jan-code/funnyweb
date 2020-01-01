<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><button type="button" class="nes-btn is-primary">Home</button></router-link>
      <router-link to="/qrcode"><button type="button" class="nes-btn is-success">QRCode</button></router-link>
      <router-link to="/decodeQrcode"><button type="button" class="nes-btn is-success">DecodeQrcode</button></router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
