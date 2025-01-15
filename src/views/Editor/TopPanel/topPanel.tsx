import { TextField } from '../../../components/textField/TextField'
import { useAppActions } from '../../hooks/useAppActions'
import useAppSelector from '../../hooks/useAppSelector'

import { Button } from '../../../components/button/Button'
import { useNavigate } from 'react-router'
import styles from './topPanel.module.css'

function TopPanel() {
    const name = useAppSelector(editor => editor.presentation.name)

    const { 
        renamePresentation,
    } = useAppActions()
    const navigate = useNavigate()

    return (
        <header className={styles.header}>
            <div>
                <h1>
                    <TextField 
                        className={styles.presentationNameField}
                        value={name}
                        onChange={(value) => renamePresentation(value)}
                    />
                </h1>
                
            </div>
            <Button border={10} onClick={() => navigate('slide-show')}>Слайд-шоу</Button>
        </header>
    )
}

export {
    TopPanel
}