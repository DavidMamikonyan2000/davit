import { ITodoListItem } from '@/types/todoList'

export default {
  namespace: 'todo',
  state: {
    todoList: [
        {
          id: 0,
          title: 'Go to shop ',
          isChecked: false,
          edit: false
        },
        {
          id: 1,
          title: 'Finish java assignment',
          isChecked: false,
          edit: false
        },
        {
          id: 2,
          title: 'Send e-email to Dr. Colins',
          isChecked: false,
          edit: false
        },
        {
          id: 3,
          title: 'Delete all folders in ../assets/plugins',
          isChecked: false,
          edit: false
        },
        {
          id: 4,
          title: 'Sell iPad Mini',
          isChecked: false,
          edit: false
        },
        {
          id: 5,
          title: 'Create new Amazon Account',
          isChecked: false,
          edit: false
        },
        {
          id: 6,
          title: 'Check new codes from section *7 student assignments',
          isChecked: false,
          edit: false
        }
      ]
  },
  getters: {
    getTodoList({ todoList }: {todoList: ITodoListItem[]}) {
      return todoList
    }
  },
  mutations: {
     /* add item in todo list logic function */
     SET_ITEM_TODO_LIST({ todoList }: {todoList: ITodoListItem[]}, payload: ITodoListItem) {
      console.log(payload, 'payload');

      todoList.push(payload)
    },

    /* remove item from todo list logic function */
    REMOVE_ITEM_TODO_LIST({ todoList }: {todoList: ITodoListItem[]}, payload: number) {
      console.log(payload);
      console.log(todoList);
      
      
      const index  = todoList.findIndex(item => item.id === payload)
      console.log(index)      
      todoList.splice(index, 1)
    },

    /* remove item from todo list logic function */
    OPEN_TODO_ITEM_EDIT({ todoList }: {todoList: ITodoListItem[]}, { id, value, title }: {id: string | number, value: boolean, title?: string}) {
      todoList.map((todo) => {
        if(todo.id === id) {
          if (title) todo.title = title
          todo.edit = value
        }
      })
    }
  },
  actions: {
  },
}
