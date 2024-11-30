import { ListSlides } from './views/ListSlides/ListSlides.tsx';
import styles from './App.module.css';
import { WorkArea } from './views/WorkArea/WorkArea.tsx';
import { BackgroundType } from './store/PresentationType.ts';
import { useState } from 'react';
// import { saveEditorToFile } from './services/saveFile.ts';
// import { loadEditorFromFile } from './services/loadFile.ts';
import useAppSelector from './views/hooks/useAppSelector.ts';

import { HistoryType } from './store/utils/history.ts';
import { HistoryContext } from './views/hooks/historyContext.ts';
import { TopPanel } from './views/TopPanel/topPanel.tsx';

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
    const presentation = useAppSelector(editor => editor.presentation)
    const slides = useAppSelector(editor => editor.presentation.slides)
    
    const selectedSlideIds = useAppSelector(editor => editor.selection.selectedSlideIds)
    const scale = presentation.scale

    const [ tempBackground, setTempBackground ] = useState<BackgroundType | null>(null)

    const selectedSlide = slides.find(slide => slide.uid === selectedSlideIds[0]);

    return (
        <HistoryContext.Provider value={history}>
        <>
            <TopPanel></TopPanel>
            <main
                className={styles.main}
            >
                <ListSlides
                    tempBackground={ tempBackground }
                />
                <WorkArea 
                    slide={selectedSlide} 
                    scale={scale}
                    onGetTempBackground={setTempBackground}
                    tempBackground={tempBackground}
                />
            </main>
            <footer className={styles.footer}>
            </footer>
        </>
        </HistoryContext.Provider>
    )
}

export default App
