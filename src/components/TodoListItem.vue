<script lang="ts" setup>
import { ITodoListItem } from '@/types/todoList';
import { ref, toRefs } from 'vue';

export interface IToDo {
    todo: ITodoListItem
}

interface EditEmit {
    id: number | string
    value: boolean
    title?: string
}

interface IToDoEmits{
    (event: 'removeItem', id: number | string): void
    (event: 'editItem', value: EditEmit): void
}

// eslint-disable-next-line no-undef
const props = defineProps<IToDo>()
// eslint-disable-next-line no-undef
const emits = defineEmits<IToDoEmits>()

const {todo} = toRefs(props)

const inputText = ref<boolean>(todo.value.isChecked)
const inputTitle = ref<string>(todo.value.title)

const editItem = (value: boolean) => {
    const data: EditEmit = {id: todo.value.id, value}
    if(!value) data.title = inputTitle.value
    emits('editItem', data)
}

</script>

<template>
    <div v-if="!todo.edit" class="todoListItems">
        <div class="todoListItems__inner">
            <div class="todoListItems__inner__checkbox-container">
                <input type="checkbox" v-model="inputText" />
                <span class="todoListItems__inner__checkbox-container__checkmark"></span>
            </div>
            <label class="todoListItems__inner__content" :style="[todo.isChecked ? {'text-decoration':'line-through' } : '']">{{ todo.title }}                 
                <span class="todoListItems__inner__content__edit-icon" @click="editItem(true)">
                    <img src='@/assets/edit-icon.svg' style="width: 20px; height: 20px;" />
                </span>
            </label>
        </div> 
        <div class="todoListItems__remove-icon" @click="emits('removeItem', todo.id)">
            <img src='@/assets/remove-icon.svg'  style="width: 20px; height: 20px;"/>
        </div>
    </div>
    <div v-else class="d-flex mt-10 w-100">
        <input type='text' class="inp" v-model="inputTitle" @keyup.esc="editItem(false)">
        <button class="btn gradient"  @click="editItem(false)">Edit</button>
    </div> 
</template>

<style>
.todoListItems {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.todoListItems__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.todoListItems__inner__content {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    width: 100%;
    justify-content: space-between;
}
</style>