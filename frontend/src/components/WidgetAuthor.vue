<script setup>
import {openModal, promptModal} from "jenesius-vue-modal";
import ModalMovie from "../modals/ModalMovie.vue";
import ModalAuthor from "../modals/ModalAuthor.vue";
import dataService from "../assets/data-service.js";
import {computed} from "vue";

const props = defineProps({
  name: String,
  birthday: String,
  id: String,
  image: String
})
const emits = defineEmits({})
async function edit() {
  const changes = await promptModal(ModalAuthor, {
    id: props.id
  })
  if (!changes) return;

  await dataService.updateAuthor(changes);
  emits('update')
}
const currentYear = new Date().getFullYear();
const years = computed(() => currentYear - new Date(props.birthday).getFullYear())
</script>

<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body d-grid gap-2">
      <div class = "d-flex gap-2 align-items-center">
        <img :src = "image" class = "widget-image"/>
        <h5 class="card-title mb-0">{{name}}</h5>
        <span>({{years}})</span>
      </div>
      <button href="#" class="btn btn-primary" @click = "edit">open card</button>
    </div>
  </div>
</template>

<style scoped>
.widget-image {
  height: 35px;
  aspect-ratio: 1/1;

  border-radius: 50%;
}
</style>