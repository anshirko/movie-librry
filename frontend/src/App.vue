<script setup>
import WidgetNavigation from "./components/WidgetNavigation.vue";
import {container as ModalContainer} from "jenesius-vue-modal";
import {useAuthorStore} from "./stores/author.js";
import {useMovieStore} from "./stores/movies.js";

const navigationConfig = [
  {
    label: "Movies",
    link: "/"
  },
  {
    label: "Authors",
    link: "/authors"
  }
]



const authorStore = useAuthorStore();
const movieStore = useMovieStore()
authorStore.read()
movieStore.read()
</script>

<template>
  <WidgetNavigation :config = "navigationConfig"/>
  <router-view/>
  <modal-container/>
</template>

<style scoped>

</style>
