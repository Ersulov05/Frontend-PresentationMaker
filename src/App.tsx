// import React from 'react'
import Slides from './views/ListSlides/Slides.tsx'
import WorkArea from './views/WorkArea/WorkArea.tsx'
// import { usePresentation } from './PresentationContext'
import { Editor } from './store/editor.ts'
import styles from './App.module.css';
// import './App.css'

interface AppProps {
    editor: Editor; // Определяем тип для пропсов
}

function App({ editor }: AppProps) {
    const { presentation } = editor;
    const selectedSlideId = presentation.selectedSlideIds.length > 0
        ? presentation.selectedSlideIds[0] // Если есть выбранные слайды, берем первый
        : null;

    const selectedSlide = selectedSlideId
        ? presentation.slides.find(slide => slide.uid === selectedSlideId)
        : undefined;

    return (
        <>
            <header className={styles.header}>
                <h1>{presentation.name}</h1>
                <button onClick={console.log} style={{ marginBottom: '20px' }}>
                    Add Slide
                </button>
            </header>
            {/* <main
                className={styles.main}
            >
                <Slides/>
                <WorkArea slide={selectedSlide} />
            </main> */}
            <footer className={styles.footer}>

            </footer>
        </>
    )
}

export default App
