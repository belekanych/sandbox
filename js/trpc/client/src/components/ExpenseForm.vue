<script setup lang="ts">
import { Ref, ref } from 'vue'
import api from '../api';
import Expense from '../../../server/src/models/expense';

const DEFAULT_EXPENSE = new Expense('', '', 0)

const emit = defineEmits<{
  created: []
}>()

const name: Ref<string> = ref(DEFAULT_EXPENSE.name)
const price: Ref<number> = ref(DEFAULT_EXPENSE.price)

const onSubmit = async () => {
  await api.expenses.store.mutate({
    name: name.value,
    price: price.value,
  })

  name.value = DEFAULT_EXPENSE.name
  price.value = DEFAULT_EXPENSE.price

  emit('created')
}
</script>

<template>
  <div class="card">
    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">
          Name:
        </label>
        <input
          v-model="name"
          type="text"
          name="Name"
          id="name"
          required
          autocomplete="off"
        />
      </div>
      <div>
        <label for="price">
          Price:
        </label>
        <input
          v-model="price"
          type="number"
          name="Price"
          id="price"
          required
          min="0"
          max="999"
          step="0.01"
          autocomplete="off"
        />
      </div>
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  </div>
</template>
