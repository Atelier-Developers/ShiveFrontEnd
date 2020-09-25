<template>
  <v-app class="faLang">
    <MainDrawer v-if="isAuthenticated"/>
    <v-app-bar
        app
        clipped-right
        elevation="0"
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        شیوه ارائه مطالب فنی
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="fill-height">
      <vue-page-transition  name="overlay-up">
        <router-view></router-view>
      </vue-page-transition>
    </v-main>
  </v-app>
</template>

<script>

import MainDrawer from "@/components/MainDrawer";
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {MainDrawer},
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters('authModule', ['isAuthenticated']),
  }
};
</script>

<style lang="scss">


@font-face {
  font-family: Shabnam;
  src: url('./fonts/Shabnam.eot');
  src: url('./fonts/Shabnam.eot?#iefix') format('embedded-opentype'),
  url('./fonts/Shabnam.woff2') format('woff2'),
  url('./fonts/Shabnam.woff') format('woff'),
  url('./fonts/Shabnam.ttf') format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: Shabnam;
  src: url('./fonts/Shabnam-Bold.eot');
  src: url('./fonts/Shabnam-Bold.eot?#iefix') format('embedded-opentype'),
  url('./fonts/Shabnam-Bold.woff2') format('woff2'),
  url('./fonts/Shabnam-Bold.woff') format('woff'),
  url('./fonts/Shabnam-Bold.ttf') format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: Shabnam;
  src: url('./fonts/Shabnam-Thin.eot');
  src: url('./fonts/Shabnam-Thin.eot?#iefix') format('embedded-opentype'),
  url('./fonts/Shabnam-Thin.woff2') format('woff2'),
  url('./fonts/Shabnam-Thin.woff') format('woff'),
  url('./fonts/Shabnam-Thin.ttf') format('truetype');
  font-weight: 100;
}

@font-face {
  font-family: Shabnam;
  src: url('./fonts/Shabnam-Light.eot');
  src: url('./fonts/Shabnam-Light.eot?#iefix') format('embedded-opentype'),
  url('./fonts/Shabnam-Light.woff2') format('woff2'),
  url('./fonts/Shabnam-Light.woff') format('woff'),
  url('./fonts/Shabnam-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: Shabnam;
  src: url('./fonts/Shabnam-Medium.eot');
  src: url('./fonts/Shabnam-Medium.eot?#iefix') format('embedded-opentype'),
  url('./fonts/Shabnam-Medium.woff2') format('woff2'),
  url('./fonts/Shabnam-Medium.woff') format('woff'),
  url('./fonts/Shabnam-Medium.ttf') format('truetype');
  font-weight: 500;
}

.faLang {
  $body-font-family: Shabnam, Tahoma !important;

  html,
  body,
  &.v-application {
    font-family: $body-font-family;
  }

  &.v-application {
    .display-4,
    .display-3,
    .display-2,
    .display-1,
    .headline,
    .title,
    .subtitle-1,
    .subtitle-2,
    .body-1,
    .body-2,
    .caption,
    .overline {
      font-family: $body-font-family;
    }
  }
}

@import '~vuetify/src/styles/settings/_variables.scss';

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

</style>
