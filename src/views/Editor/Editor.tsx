import { ListSlides } from '../ListSlides/ListSlides.tsx';
import styles from './Editor.module.css';
import { WorkArea } from '../WorkArea/WorkArea.tsx';
import { BackgroundType } from '../../store/PresentationType.ts';
import { useEffect, useState } from 'react';
import useAppSelector from '../hooks/useAppSelector.ts';

import { HistoryType } from '../../store/utils/history.ts';
import { HistoryContext } from '../hooks/historyContext.ts';
import { TopPanel } from '../TopPanel/topPanel.tsx';
import { ToolPanel } from '../ToolPanel/ToolPanel.tsx';
import { SidePopap } from '../SidePopap/SidePopap.tsx';
import { joinStyles } from '../../store/utils/joinStyles.ts';
import { ToolProvider, useToolContext } from '../context/toolContext.tsx';
import { useAppActions } from '../hooks/useAppActions.ts';
import { ImagesPopup } from '../ImagesPopup/ImagesPopup.tsx';

type EditorProps = {
    history: HistoryType,
}

function Editor({history}: EditorProps) {
    return (
        <HistoryContext.Provider value={history}>
        <>
            <TopPanel></TopPanel>
            <ToolProvider>
                <MainContent/>
            </ToolProvider>
            <footer className={styles.footer}>
            </footer>
        </>
        </HistoryContext.Provider>
    )
}

const MainContent = () => {
    const presentation = useAppSelector(editor => editor.presentation)
    const slides = useAppSelector(editor => editor.presentation.slides)
    const selectedSlideIds = useAppSelector(editor => editor.selection.selectedSlideIds)
    const scale = presentation.scale

    const [ tempBackground, setTempBackground ] = useState<BackgroundType | null>(null)

    const selectedSlide = slides.find(slide => slide.uid === selectedSlideIds[0]);
    const { openedSidePopup, togglePopup} = useToolContext() || {};

    const {
        addKeyToSetKeys,
        removeKeyToSetKeys,
    } = useAppActions()
    
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey) {
            addKeyToSetKeys('ctrl')
        }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        if (!event.ctrlKey) {
            removeKeyToSetKeys('ctrl')
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        };
    }, [])


    return (
        <main className={styles.main}>
            <div className={joinStyles(styles.container, !openedSidePopup && styles.containerFullWidth)}>
                <ToolPanel />
                <div className={styles.workContainer}>
                    <ListSlides tempBackground={tempBackground} />
                    <WorkArea 
                        slide={selectedSlide} 
                        scale={scale}
                        onGetTempBackground={setTempBackground}
                        tempBackground={tempBackground}
                    />
                </div>
            </div>
            {openedSidePopup && 
            <SidePopap onClose={togglePopup}>
                <ImagesPopup/>
            </SidePopap>}
        </main>
    );
};

export default Editor
