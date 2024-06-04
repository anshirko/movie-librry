<script setup>

import {Form, FormField, useFormState, useFormValues} from "jenesius-vue-form";
import {Modal, openModal, popModal} from "jenesius-vue-modal";
import {onMounted, ref} from "vue";
import {useAuthorStore} from "../stores/author.js";
import dataService from "../assets/data-service.js";
import ModalMovie from "./ModalMovie.vue";


const props = defineProps({
  id: String,
  disabled: Boolean
})
const emits = defineEmits()
const form = new Form();
const formState = useFormState(form);
const formValues = useFormValues(form);
const authorStore = useAuthorStore()

function saveChanges() {
  emits(Modal.EVENT_PROMPT, form.values)
}

onMounted(() => {
  readMoviesForAuthor()
  if (props.disabled) form.disable()
  if (props.id) form.setValues(authorStore.array.find(item => item.id === props.id))
})

const bindMoviesArray = ref([])
async function readMoviesForAuthor() {
  bindMoviesArray.value = await dataService.readBindMovies(props.id)
}
</script>

<template>
  <div class="modal-content widget-modal-author">
    <div class="modal-header">
      <h5 class="modal-title">{{formValues.name || "Input name of the author"}}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click = "popModal">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-field name = "name" label = "Name" />
      <form-field name = "birthday" type = "date" label = "Birthday"/>
      <form-field name = "image" label = "Image"/>

      <p class = "mb-0 mt-2">Films:</p>
      <div class = "container-films">
        <p
            class = "film-block"
          v-for = "movie in bindMoviesArray"
          :key = "movie.id"
            @click = "openModal(ModalMovie, {id: movie.id, disabled: true})"
        >{{movie.name}}</p>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" v-if="formState.changed" @click = 'saveChanges'>Save changes</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click = "popModal">Close</button>
    </div>
  </div>
</template>

<style scoped>
.widget-modal-author {
  max-width: 560px;
}
.container-films {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.film-block {
  padding: 3px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.1s;
}
.film-block:hover {
  background-color: gainsboro;
}
</style>