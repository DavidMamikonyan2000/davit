<script lang="ts" setup>
import TodoListItem  from '@/components/TodoListItem.vue'
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ITodoListItem } from '@/types/todoList'

const store = useStore()
const addTodoValue = ref<string>()
const searchTodo = ref<string>()

const todoList = computed(() => {
    return store.getters.getTodoList
})

const setItem = () => { 
    if (addTodoValue.value) {
        const todoItem: ITodoListItem = {
            title: addTodoValue.value,
            isChecked: false,
            id: Date.now(),
            edit: false
        }
        store.commit('SET_ITEM_TODO_LIST', todoItem)
        addTodoValue.value = ''
    }
}

const removeItem = (index: number | string) => {
    console.log(index, 'iiii');
    
    store.commit('REMOVE_ITEM_TODO_LIST', Number(index))
}
const openEditItem = (payload: {id: string| number, value: boolean, title?: string}) => {
    store.commit('OPEN_TODO_ITEM_EDIT', payload)
}
</script>

<template>
    <h1 class="title">Todo List</h1>
    <div class="todoList">
        <div class="todoList__search">
            <input type="search" v-model="searchTodo" placeholder="Search task..." class="todoList__search__input" />
        </div>
        <div class="todoList__content">
            <div v-for="(todo, index) in todoList" :key="index" :class="`todoList__content__item ${todo.isChecked ? 'isChecked' : ''}`">
                <TodoListItem :todo="todo" @editItem="openEditItem" @removeItem="removeItem" />
            </div>
        </div>
        <div class="todoList__form">
            <div class="todoList__form__inner">
                <input v-model="addTodoValue" type="text" class="todoList__form__inner__input" placeholder="Add task" />
                <button class="todoList__form__inner__button" @click="setItem">Add</button>
            </div>
        </div>
    </div>    
</template>


<style>
.todoList .todoList__search input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #dbd9d9;
    margin-right: 30px;
}
.todoList__search {
    /* border: 1px solid red; */
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0px 0px 10px rgba(44, 44, 44, 0.15);
}

.todoList .todoList__content {
    display: flex;
    flex-direction: column;
    background-color: red;
    box-shadow: 0px 0px 10px rgba(44, 44, 44, 0.15);
}
.todoList__content__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid #dbd9d9;
    /* border-bottom: none; */
    padding: 7px 10px;
}
.todoList__form__inner {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(44, 44, 44, 0.15);
}
.todoList__form__inner__input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #dbd9d9;
    margin-right: 30px;
}
.todoList__form__inner__button {
    width: 100px;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
}
input[type='checkbox'] {
    accent-color: green;
}
</style>