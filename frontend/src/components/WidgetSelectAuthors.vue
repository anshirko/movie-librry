<script setup>

import {promptModal, pushModal} from "jenesius-vue-modal";
import ModalSelectAuthor from "../modals/ModalSelectAuthor.vue";
import {useAuthorStore} from "../stores/author.js";
import ModalAuthor from "../modals/ModalAuthor.vue";

const props = defineProps({
  modelValue: [],
  disabled: Boolean
})

const emit = defineEmits({})

function remove(id) {
  emit('update:modelValue', props.modelValue.filter(item => item.id !== id))
}
const authorStore = useAuthorStore();
async function addAuthor() {
  const authorId = await promptModal(ModalSelectAuthor);
  const author = authorStore.array.find(item => item.id === authorId);
  if (!author) return;

  emit('update:modelValue', [
      ...(props.modelValue || []),
      author
  ]);
}

async function openAuthorModal(id) {
  pushModal(ModalAuthor, {
    id,
    disabled: true
  })
}

</script>

<template>
<div>
  <p class = "container-input-wrap-label vf-input-label mb-0">Select Author</p>

  <div class = "container-input-authors mb-1">
    <div
        class = "author-wrap"
        v-for = "author in modelValue"
        :key = "author.id"
    >
      <span @click = "openAuthorModal(author.id)">{{author.name}}</span>
      <i class="p-1 bi bi-x-lg cursor-pointer" @click = "remove(author.id)" v-if = "!disabled"></i>
    </div>
  </div>

  <button class = "btn btn-primary" @click = "addAuthor" v-if = "!disabled">Add author</button>
</div>
</template>

<style scoped>
.container-input-authors {
  padding: 4px 6px;
  display: flex;
  gap: 5px;
  align-items: center;
  height: var(--vf-input-height);
  border-radius: var(--vf-input-border-radius);
  border: var(--vf-input-border);
  background-color: var(--vf-input-background);
}
.author-wrap {
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: var(--primary);
  font-size: 14px;
  line-height: 16px;
  padding: 2px 4px;
  color: white;
  border-right: 2px;
}
</style>