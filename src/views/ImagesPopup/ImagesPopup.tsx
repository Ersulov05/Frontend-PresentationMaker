import { useState } from "react"
import { Button } from "../../components/button/Button"
import { Icon } from "../../components/icon/Icon"
import { SliderButtons } from "../../components/sliderButtons/sliderButtons"
import { TextField } from "../../components/textField/TextField"
import { ImageDataType } from "../../store/objects/addImageToSlide"
import { useAppActions } from "../hooks/useAppActions"
import useAppSelector from "../hooks/useAppSelector"
import styles from './ImagesPopup.module.css'
import { Text } from "../../components/text/Text"

function SearchedImages() {
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
            <div className={styles.searchContainer}>
                <TextField
                    onChange={setImageName}
                    placeholder='поиск'
                    className={styles.searchField}
                />
                <Button 
                    onClick={() => searchImageAsync(imageName)}
                    border={10}
                >
                    search
                </Button>
            </div>
            <div className={styles.imagesContainer}>
                <div className={styles.images}>
                    {images.length === 0
                        ? <Text>Ничего не найдено</Text>
                        : images.map(image => (
                            <Icon
                                key={image.id}
                                className={styles.image}
                                iconSrc={image.url} 
                                size={132}
                                onClick={() => setSelectedImageId(image.id)}
                                style={ image.id == selectedImageId 
                                    ? { border: "solid 2px red" } 
                                    : { border: "solid 2px black" }
                                }
                            />
                        ))
                    }
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {selectedImageId && 
                    <Button 
                        onClick={onAddImage}
                        border={10}
                    >
                        add Image
                    </Button>
                }
            </div>
            
        </>
    )
}

function SourceImages() {
    return (
        <div>

        </div>
    )
}

function ImagesPopup() {
    const [selectButton, setSelectButton] = useState('поиск')
    
    return (
        <>
            <SliderButtons
                onSelect={setSelectButton}
                buttons={["поиск", "источник"]}
            />
            {selectButton === "поиск" && <SearchedImages />}
            {selectButton === "источник" && <SourceImages />}
        </>
    )
}

export {
    ImagesPopup
}