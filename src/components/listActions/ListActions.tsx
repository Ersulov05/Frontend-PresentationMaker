type ComponentButton = {
    type: "Button"
    onClick?: (value: number) => void
    value: string
}

type ComponentListAction = {
    type: "ListAction"
    components: Array<ComponentListAction | ComponentButton>
}

type ListActionsProps = {
    components: Array<ComponentListAction | ComponentButton>
}


function ListActions({ components }: ListActionsProps) {

}

export {
    ListActions
}