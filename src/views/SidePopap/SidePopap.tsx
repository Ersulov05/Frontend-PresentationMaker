import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'
import styles from './SidePopap.module.css'

type SidePopapProps = {
    children?: React.ReactNode
    onClose?: () => void
}

function SidePopap({
    children,
    onClose,
}: SidePopapProps) {
    return (
        <div className={styles.container}>
            <div className={styles.popap}>
                <div className={styles.header}>
                    {/* title, button close */}
                    <div className={styles.title}></div>
                    <Button 
                        onClick={onClose} 
                        className={styles.buttonClose}
                    >
                        <Icon iconSrc="/image/iconKrest.svg" size={40}/>
                    </Button>
                </div>
                {children}
            </div>
            
        </div>
    )
}

export {
    SidePopap
}