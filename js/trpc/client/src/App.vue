<script setup lang="ts">
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import Expense from '../../server/src/models/expense'
import api from './api'

const expenses: Ref<Expense[]> = ref([])

const load = async () => {
  expenses.value = await api.expenses.index.query()
}
load()
</script>

<template>
  <expense-form @created="load" />
  <expense-list
    :expenses="expenses"
    @removed="load"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
