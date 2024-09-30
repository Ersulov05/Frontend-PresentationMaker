// import React from 'react'
import Slides from './ListSlides/Slides.tsx'
import WorkArea from './WorkArea/WorkArea.tsx'
import { usePresentation } from './PresentationContext'
import styles from './App.module.css';
// import './App.css'



function App() {
    const { presentation, addSlide } = usePresentation();
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
                <button onClick={addSlide} style={{ marginBottom: '20px' }}>
                    Add Slide
                </button>
            </header>
            <main
                className={styles.main}
            >
                <Slides/>
                <WorkArea slide={selectedSlide} />
            </main>
            <footer className={styles.footer}>

            </footer>
        </>
    )
}

export default App
