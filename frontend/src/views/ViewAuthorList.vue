<script setup>

import {popModal, promptModal} from "jenesius-vue-modal";
import ModalAuthor from "../modals/ModalAuthor.vue";
import dataService from "../assets/data-service.js";
import {useAuthorStore} from "../stores/author.js";
import WidgetAuthor from "../components/WidgetAuthor.vue";

const authorStore = useAuthorStore();

async function createNew() {
  const author = await promptModal(ModalAuthor);
  await dataService.createAuthor(author);
  await authorStore.read();
  await popModal();
}

function update() {
  return authorStore.read()
}
</script>

<template>
<div class = "p-3">

  <button @click = "createNew" class = "btn btn-primary mb-3">Create New</button>

  <div class = "d-flex gap-3">
    <widget-author
        @update = "update"
        v-for = "item in authorStore.array"
        :key = "item.id"

        :name = "item.name"
        :birthday = "item.birthday"
        :id = "item.id"
        :image = "item.image"
    />
  </div>
</div>

</template>

<style scoped>

</style>