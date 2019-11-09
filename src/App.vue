<template>
  <div id="app">
    <div id="nav">
      <router-link class="routing__planner" to="/"><i class="material-icons">commute</i><span>Plannification</span></router-link>
      <router-link class="routing__history" to="/history"><i class="material-icons">library_books</i><span>Mes itinéraires</span></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
body {
  background: #fafafa;
  color: white;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  & #nav {
    background: #B0D7FF;
    display: flex;
    justify-content: center;
    
  }

  & #app {
    margin-top: 0;
  }
}

.routing__planner, .routing__history {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 5px 0 5px 0;
  color: #5D5D81;
  & i {
    font-size: 3rem;
    color: #5D5D81;
  }
}

.routing__planner {
  border-right: 1px solid #5D5D81;
}
</style>