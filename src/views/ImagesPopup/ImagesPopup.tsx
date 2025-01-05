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

type LinkImageProps = {
    onLoadImage: (image: string) => void
}

function LinkImage({
    onLoadImage,
}: LinkImageProps) {
    const [imageLink, setImageLink] = useState('')

    return (
        <div className={styles.linkLoadImageContainer}>
            <TextField
                onChange={setImageLink}
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

const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    });
};

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
            getBase64(file)
                .then((imageBase64) => {
                    setLoadImage(imageBase64)
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