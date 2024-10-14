import { Button } from '../../../components/button/Button'
import styles from './PopupChangeBackground.module.css'

type PopupChangeBackgroundProps = {
    onClickClose: () => void
}

function PopupChangeBackground({
    onClickClose,
}: PopupChangeBackgroundProps)
{
    function onSaveHandler() {
        onClickClose()
    }

    function onApplyToAllHandler() {
        onClickClose()
    }

    return (
        <div className={styles.popupContainer}>
            <div className={styles.popup}>
                <div className={styles.popupTitleContainer}>
                    <div className={styles.popupTitle}>Background</div>
                    <Button 
                        className={styles.buttonClosePopup} 
                        onClick={onClickClose}
                    />
                </div>
                <div className={styles.popupContent}>
                    <div className={styles.popupContentItem}>
                        <label className={styles.popupLabel}>Color:</label>
                        <Button 
                            className={styles.popupButton} 
                            value='Choose color'
                            onClick={onApplyToAllHandler}
                        />
                    </div>
                    <div className={styles.popupContentItem}>
                        <label className={styles.popupLabel}>Image:</label>
                        <Button 
                            className={styles.popupButton} 
                            value='Load image'
                            onClick={onApplyToAllHandler}
                        />
                    </div>
                </div>
                <div className={styles.popupButtonsContainer}>
                    <Button 
                        className={styles.popupButton} 
                        value='Apply to all'
                        onClick={onApplyToAllHandler}
                    />
                    <Button 
                        className={styles.popupButton} 
                        value='Save'
                        onClick={onSaveHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export {
    PopupChangeBackground
}