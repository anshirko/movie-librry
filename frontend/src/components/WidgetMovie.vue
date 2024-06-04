<script setup>
import {openModal, promptModal} from "jenesius-vue-modal";
import ModalMovie from "../modals/ModalMovie.vue";
import dataService from "../assets/data-service.js";

const props = defineProps({
  name: String,
  created: String,
  descriptions: String,
  id: String,
  authors: [],
  image: String
})
const emits = defineEmits({})

async function edit() {
  const values = await promptModal(ModalMovie, {id: props.id});
  if (!values) return;

  await dataService.updateMovie(values)
  emits('update')
}


</script>

<template>
  <div class="card" style="width: 18rem;">
    <img :src="image" class="widget-movie-img card-img-top" alt="...">
    <div class="card-body d-grid">
      <h5 class="card-title">{{name}}({{new Date(created).getFullYear()}})</h5>
      <p class="card-text">{{descriptions}}</p>
      <button href="#" class="btn btn-primary" @click = "edit">open card</button>
    </div>
  </div>
</template>

<style scoped>
.widget-movie-img {
  height: 210px;
}
</style>