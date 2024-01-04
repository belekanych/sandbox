<script setup lang="ts">
import Expense from '../../../server/src/models/expense';
import api from '../api';

const props = defineProps<{
  expense: Expense
}>()

const emits = defineEmits<{
  removed: []
}>()

function remove(id: string): void {
  api.expenses.remove.mutate(id);

  emits('removed')
}
</script>

<template>
  <li>
    <strong>{{ props.expense.name }}</strong>
    {{ props.expense.price }}
    <button
      type="button"
      @click="remove(props.expense.id)"
    >X</button>
  </li>
</template>
