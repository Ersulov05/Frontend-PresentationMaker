import { ListSlides } from './views/ListSlides/ListSlides.tsx';
import styles from './App.module.css';
import { WorkArea } from './views/WorkArea/WorkArea.tsx';
import { BackgroundType } from './store/PresentationType.ts';
import { useState } from 'react';
import useAppSelector from './views/hooks/useAppSelector.ts';

import { HistoryType } from './store/utils/history.ts';
import { HistoryContext } from './views/hooks/historyContext.ts';
import { TopPanel } from './views/TopPanel/topPanel.tsx';
import { ToolPanel } from './views/ToolPanel/ToolPanel.tsx';
import { SidePopap } from './views/SidePopap/SidePopap.tsx';
import { joinStyles } from './store/utils/joinStyles.ts';
import { ToolProvider, useToolContext } from './views/context/toolContext.tsx';
import { TextField } from './components/textField/TextField.tsx';
import { Button } from './components/button/Button.tsx';
import { useAppActions } from './views/hooks/useAppActions.ts';
import { Icon } from './components/icon/Icon.tsx';

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
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
    const images = useAppSelector(editor => editor.searchedImages)
    const scale = presentation.scale

    const [ tempBackground, setTempBackground ] = useState<BackgroundType | null>(null)

    const selectedSlide = slides.find(slide => slide.uid === selectedSlideIds[0]);
    const { openedSidePopup, togglePopup} = useToolContext() || {};
    const { 
        searchImageAsync,
    } = useAppActions() 
    const [imageName, setImageName] = useState('')
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
                <TextField
                    onChange={setImageName}
                    placeholder='поиск'
                    style={{
                        border: 'solid 1px black',
                        margin: '10px',
                        paddingInline: '10px',
                        paddingBlock: '5px'
                    }}
                />
                <Button onClick={() => searchImageAsync(imageName)}>search</Button>
                {images.map(image => (
                    <Icon iconSrc={image.url} size={70} key={image.id}/>
                ))}
            </SidePopap>}
        </main>
    );
};

export default App
