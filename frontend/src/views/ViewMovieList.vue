<script setup>

import WidgetMovie from "../components/WidgetMovie.vue";
import {openModal, promptModal} from "jenesius-vue-modal";
import ModalMovie from "../modals/ModalMovie.vue";
import dataService from "../assets/data-service.js";
import {useMovieStore} from "../stores/movies.js";
import {computed} from "vue";

const movieStore = useMovieStore();

async function createNew() {
  const movieData = await promptModal(ModalMovie);
  const movie = await dataService.createMovie(movieData);
  await movieStore.read()
  openModal(ModalMovie, {
    id: movie.id,
  })
}

function read() {
  movieStore.read()
}

</script>

<template>
  <div class = "p-3">
    <button type = "button" class = "btn btn-primary mb-3" @click = "createNew">Add new</button>
    <div class = "row row-cols-1 row-cols-md-3 g-4">
      <div
          class = "col"
          v-for = "movie in movieStore.array"
          :key = "movie.id"
      >
        <widget-movie
            :id = "movie.id"
            :name = "movie.name"
            :authors = "movie.authors"
            :created = "movie.created"
            :image = "movie.image"
            :descriptions = "movie.descriptions"
            @update = "read"
        />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>