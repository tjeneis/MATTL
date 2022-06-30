<template>
  <v-app>
    <v-app-bar color="transparent" fixed flat>
      <v-row>
        <v-col cols="auto">
          <v-btn color="primary" depressed large rounded to="/">
            <v-icon left>fa-long-arrow-left</v-icon>
            {{ $t("backToMap") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <div class="fill-height d-flex flex-column align-center justify-center">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "GameLayout",
};
</script>


<style lang="scss">
html {
  height: -webkit-fill-available;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  height: -webkit-fill-available;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.v-application {
  background: #2c597a !important;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: rgba(44, 89, 122, 0.5);
  color: white;
  cursor: pointer;
}
</style>