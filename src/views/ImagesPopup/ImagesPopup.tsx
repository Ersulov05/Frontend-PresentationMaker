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
import { FileInput } from "../../components/fileInput/fileInput"
import { Base64FormatType, getBase64ByFile, getBase64ByURL, isValidBase64Data } from "../../store/utils/imageManager"
import { BackgroundDataType } from "../../store/slides/changeBackgroundSlide"

function SearchedImages() {
    const { 
        searchImageAsync,
        addImageObject,
        changeBackground,
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

    function onChangeBackground() {
        const image = images.find(image => image.id === selectedImageId)
        if (!image) return
        const backgroundData: BackgroundDataType = {
            background: {
                src: image.url,
                type: "image"
            }
        }
        changeBackground(backgroundData)
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
                <Button  
                    onClick={onAddImage}
                    border={10}
                    style={{
                        width: "100%"
                    }}
                    disabled={!selectedImageId}
                >
                    Добавить картинку
                </Button>
                <Button  
                    onClick={onChangeBackground}
                    border={10}
                    style={{
                        width: "100%"
                    }}
                    disabled={!selectedImageId}
                >
                    Вставить картинку как фон
                </Button>
            </div>
        </>
    )
}

type LinkImageProps = {
    onLoadImage: (image: string) => void
}

function LinkImage({
    onLoadImage,
}: LinkImageProps) {
    const [imageLink, setImageLink] = useState('')

    function handleLoad(url: string) {
        getBase64ByURL(url)
            .then((imageBase64) => {
                const formats: Base64FormatType[] = [
                    Base64FormatType.IMAGE_PNG,
                    Base64FormatType.IMAGE_SVG,
                    Base64FormatType.IMAGE_JPEG,
                    Base64FormatType.IMAGE_GIF,
                ]
                if (isValidBase64Data(imageBase64, formats)) {
                    setImageLink(imageBase64)
                } else {
                    console.log("неверный тип base64")
                }
            })
            .catch((error) => {
                console.error("Ошибка при загрузке изображения:", error);
            });
    }

    return (
        <div className={styles.linkLoadImageContainer}>
            <TextField
                onChange={handleLoad}
                placeholder='ссылка'
                className={styles.searchField}
                style={{
                    width: "100%"
                }}
            />
            <div className={styles.previewImageContainer}>
                {imageLink === ''
                    ? <Text>Здесь появится загруженная картинка</Text>
                    : <img 
                        className={styles.previewImage} 
                        src={imageLink} 
                        alt="картинка загруженная по ссылке"
                    />
                }
            </div>
            <Button  
                onClick={() => onLoadImage(imageLink)}
                border={10}
                style={{
                    width: "100%"
                }}
                disabled={imageLink === ''}
            >
                Добавить картинку
            </Button>
        </div>
    )
}

type SourceImageProps = {
    onLoadImage: (image: string) => void
}

function SourceImage({
    onLoadImage,
}: SourceImageProps) {
    const [loadImage, setLoadImage] = useState('')

    function handleLoad(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file && file.type === 'image/png') {
            getBase64ByFile(file)
                .then((imageBase64) => {
                    const formats: Base64FormatType[] = [
                        Base64FormatType.IMAGE_PNG,
                        Base64FormatType.IMAGE_SVG,
                        Base64FormatType.IMAGE_JPEG,
                        Base64FormatType.IMAGE_GIF,
                    ]
                    if (isValidBase64Data(imageBase64, formats)) {
                        setLoadImage(imageBase64)
                    } else {
                        console.log("неверный тип base64")
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке изображения:", error);
                });
        } else {
            console.error("Выберите файл формата PNG.");
        }
    }

    return (
        <div className={styles.fileLoadImageContainer}>
            <FileInput id={"load-image-by-pc"} onChange={handleLoad}/>
            <Button  
                onClick={() => {document.getElementById('load-image-by-pc')?.click()}}
                border={10}
                style={{
                    width: "100%"
                }}
            >
                Загрузить картинку
            </Button>
            <div className={styles.previewImageContainer}>
                {loadImage === ''
                    ? <Text>Здесь появится загруженная картинка</Text>
                    : <img 
                        className={styles.previewImage} 
                        src={loadImage} 
                        alt="картинка загруженная из файла" 
                    />
                }
            </div>
            <Button  
                onClick={() => onLoadImage(loadImage)}
                border={10}
                disabled={loadImage === ''}
                style={{
                    width: "100%"
                }}
            >
                Добавить картинку
            </Button>
        </div>           
    )
}

function ImagesPopup() {
    const [selectButton, setSelectButton] = useState('поиск')
    
    const {addImageObject} = useAppActions() 

    function onAddImage(image: string) {
        if (image === '') {
            return
        }
        const data: ImageDataType = {
            position: {
                x: 10,
                y: 10,
            },
            size: {
                width: 100,
                height: 100,
            },
            src: image
        }
        addImageObject(data)
    }

    return (
        <>
            <SliderButtons
                onSelect={setSelectButton}
                buttons={["поиск", "источник", "ссылка"]}
            />
            {selectButton === "поиск" && <SearchedImages />}
            {selectButton === "источник" && <SourceImage onLoadImage={onAddImage}/>}
            {selectButton === "ссылка" && <LinkImage onLoadImage={onAddImage}/>}
        </>
    )
}

export {
    ImagesPopup
}