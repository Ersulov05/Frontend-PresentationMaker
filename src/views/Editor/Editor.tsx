import { ListSlides } from '../ListSlides/ListSlides.tsx';
import styles from './Editor.module.css';
import { WorkArea } from '../WorkArea/WorkArea.tsx';
import { BackgroundType } from '../../store/PresentationType.ts';
import { useState } from 'react';
import useAppSelector from '../hooks/useAppSelector.ts';

import { HistoryType } from '../../store/utils/history.ts';
import { HistoryContext } from '../hooks/historyContext.ts';
import { TopPanel } from '../TopPanel/topPanel.tsx';
import { ToolPanel } from '../ToolPanel/ToolPanel.tsx';
import { SidePopap } from '../SidePopap/SidePopap.tsx';
import { joinStyles } from '../../store/utils/joinStyles.ts';
import { ToolProvider, useToolContext } from '../context/toolContext.tsx';
import { TextField } from '../../components/textField/TextField.tsx';
import { Button } from '../../components/button/Button.tsx';
import { useAppActions } from '../hooks/useAppActions.ts';
import { Icon } from '../../components/icon/Icon.tsx';
import { ImageDataType } from '../../store/objects/addImageToSlide.ts';

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
    const images = useAppSelector(editor => editor.searchedImages)
    const scale = presentation.scale

    const [ tempBackground, setTempBackground ] = useState<BackgroundType | null>(null)

    const selectedSlide = slides.find(slide => slide.uid === selectedSlideIds[0]);
    const { openedSidePopup, togglePopup} = useToolContext() || {};
    const { 
        searchImageAsync,
        addImageObject,
    } = useAppActions() 
    const [imageName, setImageName] = useState('')
    const [selectedImageId, setSelectedImageId] = useState('')

    function onAddImage() {
        if (selectedImageId === '') {
            return
        }
        const image = images.find(image => image.id === selectedImageId)
        if (image) {
            const data: ImageDataType = {
                position: {
                    x: 10,
                    y: 10,
                },
                size: {
                    width: 100,
                    height: 100,
                },
                src: image.url
            }
            addImageObject(data)
        }
    }

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
                <div className={styles.imagesContainer}>
                    {images.map(image => (
                        <div 
                            key={image.id}
                            className={styles.image}
                            onClick={() => setSelectedImageId(image.id)}
                            style={ image.id == selectedImageId 
                                ? {
                                    border: "solid 2px red"
                                } 
                                : {}
                            }
                        >
                            <Icon iconSrc={image.url} size={67}/>
                        </div>
                    ))}
                </div>
                { selectedImageId && <Button onClick={onAddImage}>add Image</Button>}
                
            </SidePopap>}
        </main>
    );
};

export default Editor
