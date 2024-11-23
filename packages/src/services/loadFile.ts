import { dispatch, EditorType } from "../store/editor"
import { validateEditorData } from "./validationTypes"

const loadEditorFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
        if (file.type === 'application/json' || file.name.endsWith('.json')) {
            const reader = new FileReader()

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const content = e.target?.result
                if (typeof content === 'string') {
                    try {
                        const parsedData: EditorType = JSON.parse(content)
                        if (validateEditorData(parsedData)) {
                            console.log("Данные валидны:", parsedData)
                            dispatch(() => parsedData, parsedData)
                        } else {
                            console.error("Данные не валидны.")
                        }
                    } catch (error) {
                        console.error("Ошибка парсинга JSON:", error)
                    }
                }
            }

            reader.readAsText(file)
        } else {
            console.error("Выберите файл формата JSON.")
        }
    }
}

export {
    loadEditorFromFile
}