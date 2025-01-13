import { Button } from '../../../components/button/Button'
import { Icon } from '../../../components/icon/Icon'
import { Text } from '../../../components/text/Text'
import styles from './SidePopap.module.css'

type SidePopapProps = {
    title: string
    children?: React.ReactNode
    onClose?: () => void
}

function SidePopap({
    title,
    children,
    onClose,
}: SidePopapProps) {
    return (
        <div className={styles.container}>
            <div className={styles.popap}>
                <div className={styles.header}>
                    <Text className={styles.title}>{title}</Text>
                    <Button 
                        onClick={onClose} 
                        className={styles.buttonClose}
                    >
                        <Icon iconSrc="/image/iconKrest.svg" size={40}/>
                    </Button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            
        </div>
    )
}

export {
    SidePopap
}