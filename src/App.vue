<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
@font-face {
  font-family: 'gjm';
  src: url('./assets/fonts/guo.ttf');
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
  text-decoration: none;
}
.flex {
  display: flex;
}
.j-c {
  justify-content: center;
}
.j-s {
  justify-content: space-between;
}
.a-c {
  align-items: center;
}
</style>
