import { validatePresentationData } from '../../services/validationTypes';
import { AppDispatch } from '../../store/redux/store';
import { PresentationType } from '../PresentationType';
import { setPresentation } from './presentationActionCreators';

function exportPresentationToJSON(presentation: PresentationType) {
    return () => {
        const jsonString = JSON.stringify(presentation, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
    
        const a = document.createElement('a')
        a.href = url
        a.download = `${presentation.name}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }
}

const importPresentationFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    return (dispatch: AppDispatch) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                const reader = new FileReader()

                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const content = e.target?.result
                    if (typeof content === 'string') {
                        try {
                            const parsedData: PresentationType = JSON.parse(content)
                            if (validatePresentationData(parsedData)) {
                                console.log("Данные валидны:", parsedData)
                                dispatch(setPresentation(parsedData))
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
}

export {
    importPresentationFromJSON,
    exportPresentationToJSON,
}