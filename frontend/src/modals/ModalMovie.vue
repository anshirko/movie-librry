<script setup>
import {onMounted, ref} from "vue";
import dataService from "../assets/data-service.js";
import {closeModal, Modal, popModal} from "jenesius-vue-modal";
import {Form, FormField, useFormState, useFormValues} from "jenesius-vue-form";
import {useMovieStore} from "../stores/movies.js";

const props = defineProps({
  id: String,
  disabled: Boolean
})
const emits = defineEmits()
const movieData = ref()
const form = new Form();
const formValues = useFormValues(form)
const formState = useFormState(form)
const movieStore = useMovieStore()

onMounted(() => {
  if (props.disabled) form.disable()
  form.setValues(
      movieStore.array.find(item => item.id === props.id)
  )
})

function readData() {
  movieData.value = dataService.readMovieById(props.id);
}
onMounted(readData)

async function saveChanges() {
  console.log(form.values)
  emits(Modal.EVENT_PROMPT, form.values);
}

function close() {
  closeModal()
}
</script>

<template>
  <div class="modal-content widget-modal-movie" v-if = "movieData">
    <div class="modal-header">
      <h5 class="modal-title">{{formValues.name || "Input name of the movie"}}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click = "close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-field name = "name" label = "Title" />
      <form-field name = "description" type = "textarea" label = "Description"/>
      <form-field name = "created" type = "date" label = "Created"/>
      <form-field name = "image" label = "Image" />
      <form-field name = "authors" type = "authors" />
      <form-field name = "feedback" type = "textarea" label = "Feedback" />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" v-if="formState.changed" @click = 'saveChanges'>Save changes</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click = "close">Close</button>
    </div>
  </div>
</template>

<style scoped>
.widget-modal-movie {
  max-width: 750px;
}
</style>