<script setup>

import {Form, FormField, useFormState} from "jenesius-vue-form";
import {Modal, popModal} from "jenesius-vue-modal";
import {useAuthorStore} from "../stores/author.js";
import {computed} from "vue";

function close() {
  popModal()
}
const emits = defineEmits()
const form = new Form()
const formState = useFormState(form)
const authorStore = useAuthorStore();
const parsedAuthorList = computed(() => authorStore.array.map(item => ({
  label: item.name,
  value: item.id
})))
function select(){
  emits(Modal.EVENT_PROMPT, form.getValueByName('author'))
}
</script>

<template>
  <div class="modal-content widget-modal-select-author" >
    <div class="modal-header">
      <h5 class="modal-title">Select Author</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click = "close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form-field name = "author" type = "select" label = "Author list" :options = "parsedAuthorList"/>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click = "select" >Select</button>
    </div>
  </div>
</template>

<style scoped>
.widget-modal-select-author {
  max-width: 400px;
}
</style>