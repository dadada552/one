<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body,
html {
  width: 100%;
  height: 100%;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.el-menu{
  border: 0 !important;
}

.el-table .cell{
  text-align: center;
}

</style>
