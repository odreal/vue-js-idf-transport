<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
body {
  background: #74b9ff;
  color: white;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
} 
</style>