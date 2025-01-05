import { useState } from "react"
import { Button } from "../../components/button/Button"
import { Icon } from "../../components/icon/Icon"
import { SliderButtons } from "../../components/sliderButtons/sliderButtons"
import { TextField } from "../../components/textField/TextField"
import { ImageDataType } from "../../store/objects/addImageToSlide"
import { useAppActions } from "../hooks/useAppActions"
import useAppSelector from "../hooks/useAppSelector"
import styles from './ImagesPopup.module.css'

type ImagesPopupProps = {

}

function ImagesPopup({

}: ImagesPopupProps) {

    const { 
        searchImageAsync,
        addImageObject,
    } = useAppActions() 

    const images = useAppSelector(editor => editor.searchedImages)

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
        <>
            <SliderButtons buttons={["поиск", "источник"]}/>
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
        </>
    )
}

export {
    ImagesPopup
}