export interface ITodoListItem {
    id: number | string
    title: string
    isChecked: boolean
    edit: boolean
}

export interface ITodoList {
    todo: Array<ITodoListItem>
}