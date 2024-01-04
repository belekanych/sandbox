<script setup lang="ts">
import ExpenseListItem from './ExpenseListItem.vue';
import Expense from '../../../server/src/models/expense';

const props = defineProps<{
  expenses: Expense[]
}>()

const emits = defineEmits<{
  removed: []
}>()
</script>

<template>
  <ul class="card">
    <expense-list-item
      v-for="(expense, id) in props.expenses"
      :key="id"
      :expense="expense"
      @removed="emits('removed')"
    />
  </ul>
</template>
