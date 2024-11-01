<script setup lang="ts">
import { ref, computed } from 'vue'
import TrashIcon from '../components/icons/TrashIcon.vue'
import EditIcon from '../components/icons/EditIcon.vue'
import XIcon from '../components/icons/XIcon.vue'
import TickIcon from '../components/icons/TickIcon.vue'
import { v4 as uuidv4 } from 'uuid'

const showModal = ref(false)

const todos = ref([])

const editTask = ref('')

const title = ref('')

const status = ref('Incomplete')

const filterdTodos = ref('All')

const resetForm = () => {
  title.value = ''
  status.value = 'Incomplete'
}

const handleAddEditTask = () => {
  if (!editTask.value) {
    todos.value.push({
      id: uuidv4(),
      title: title.value,
      status: status.value,
      createDate: new Date(),
    })
  } else {
    todos.value = todos.value.map(todo => {
      if (todo.id === editTask.value) {
        return {
          ...todo,
          title: title.value,
          status: status.value,
          createDate: new Date(),
        }
      } else {
        return todo
      }
    })
  }

  showModal.value = false

  resetForm()

  editTask.value = ''
}

const toggleStatus = (id: string) => {
  todos.value = todos.value.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        status: todo.status === 'Complete' ? 'Incomplete' : 'Complete',
      }
    } else {
      return todo
    }
  })
}

const handleRemoveTask = (id: string) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const handleEditTask = (item: {
  id: string
  title: string
  status: string
  createDate: Date
}) => {
  console.log(item, 'item')
  editTask.value = item.id
  showModal.value = true

  title.value = item.title
  status.value = item.status
}

const handleFilteredTodos = computed(() => {
  return todos.value.filter(todo => {
    if (filterdTodos.value === 'All') {
      return todo
    } else if (filterdTodos.value === 'Complete') {
      return todo.status === 'Complete'
    } else if (filterdTodos.value === 'Incomplete') {
      return todo.status === 'Incomplete'
    }
  })
})
</script>

<template>
  <main class="h-screen flex flex-col items-center gap-16 p-8">
    <header>
      <span class="font-bold text-3xl text-slate-600">TODO LIST</span>
    </header>

    <section class="flex flex-col gap-4 self-stretch">
      <div class="flex items-center justify-between">
        <button
          id="addTaskButton"
          @click="showModal = !showModal"
          class="bg-indigo-600 rounded-md px-4 py-2 text-gray-200"
        >
          Add Task
        </button>

        <select
          class="bg-gray-300 rounded-md px-4 py-2 border-none outline-none"
          v-model="filterdTodos"
        >
          <option>All</option>
          <option>Incomplete</option>
          <option>Complete</option>
        </select>
      </div>
      <div class="p-4 bg-gray-300 rounded-md flex flex-col gap-4">
        <div
          v-for="(item, index) of handleFilteredTodos"
          :key="index"
          class="p-2 bg-gray-100 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              @click="toggleStatus(item.id)"
              class="w-8 relative h-8 rounded-sm"
              :class="[
                item.status === 'Complete' ? 'bg-indigo-600' : 'bg-gray-200',
              ]"
            >
              <TickIcon
                v-if="item.status === 'Complete'"
                class="absolute stroke-gray-100 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
              />
            </div>
            <div class="flex flex-col gap-1">
              <span
                class="text-gray-600"
                :class="{ 'line-through': item.status === 'Complete' }"
                >{{ item.title }}</span
              >
              <span>{{ item.createDate.toISOString() }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button
              @click="handleRemoveTask(item.id)"
              class="p-2 bg-gray-300 rounded-sm"
            >
              <TrashIcon />
            </button>
            <button
              @click="handleEditTask(item)"
              class="p-2 bg-gray-300 rounded-sm"
            >
              <EditIcon />
            </button>
          </div>
        </div>
        <span class="text-center" v-if="todos.length === 0">No Task</span>
      </div>
    </section>

    <div
      v-if="showModal"
      id="modal"
      class="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 bg-black/40"
    >
      <div
        class="rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 p-4 flex flex-col gap-2"
      >
        <button
          id="xCloseModal"
          @click="showModal = false"
          class="p-2 bg-gray-300 hover:text-gray-100 hover:bg-red-600 transition-colors rounded-md self-end"
        >
          <XIcon />
        </button>

        <div class="bg-gray-300 rounded-md flex flex-col gap-8 p-4">
          <span class="font-bold text-2xl">{{
            editTask ? 'EDIT TODO' : 'ADD TODO'
          }}</span>
          <div class="flex flex-col gap-4">
            <label class="flex flex-col gap-2">
              <span>Title</span>
              <input
                v-model="title"
                class="bg-gray-100 p-2 rounded-md w-full border-none outline-none"
              />
            </label>
            <label class="flex flex-col gap-2">
              <span>Status</span>

              <select
                v-model="status"
                class="bg-gray-100 p-2 rounded-md w-full border-none outline-none"
              >
                <option>Incomplete</option>
                <option>Complete</option>
              </select>
            </label>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="handleAddEditTask"
              class="bg-indigo-600 px-4 py-2 rounded-md text-gray-100"
            >
              {{ editTask ? 'Edit Todo' : 'Add Todo' }}
            </button>
            <button
              id="cancelButton"
              @click="showModal = false"
              class="bg-gray-400 text-gray-600 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
