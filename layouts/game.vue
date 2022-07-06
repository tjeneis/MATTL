<template>
  <v-app>
    <v-app-bar
      color="transparent"
      :elevation="0"
      fixed
    >
      <v-row dense>
        <v-col cols="auto">
          <v-btn
            color="primary"
            depressed
            large
            rounded
            to="/"
          >
            <v-icon
              left
              :size="16"
            >
              fa-long-arrow-left
            </v-icon>
            {{ $t("backToMap") }}
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <GameHighScores />
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
  name: 'GameLayout'
}
</script>

<style lang="scss" scoped>
html {
  height: -webkit-fill-available;
}

body {
  height: 100vh;
  height: -webkit-fill-available;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
}

.v-application {
  background: #2c597a !important;
}
</style>

<style lang="scss">
#score {
  font-size: 2em;
  font-weight: 900;
  position: absolute;
  right: 30px;
  top: 30px;
}

#restart {
  background-color: red;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.2em;
  font-weight: 700;
  height: 120px;
  position: absolute;
  width: 120px;
}

#multiplier {
  position: absolute;
  transition: opacity 2s;
}

#start {
  align-items: center;
  background: rgba(44, 89, 122, 0.5);
  color: white;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>
