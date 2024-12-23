import React, { useEffect } from 'react'
import { NumberField } from '../../components/numberField/NumberField'
import { TextField } from '../../components/textField/TextField'
import { ImageDataType } from '../../store/objects/addImageToSlide'
import { TextDataType } from '../../store/objects/addTextToSlide'
import { useAppActions } from '../hooks/useAppActions'
import useAppSelector from '../hooks/useAppSelector'
import styles from './topPanel.module.css'
import { HistoryContext } from '../hooks/historyContext'
import { Button } from '../../components/button/Button'
import { useNavigate } from 'react-router'

function TopPanel() {
    const name = useAppSelector(editor => editor.presentation.name)

    const { 
        renamePresentation,
    } = useAppActions()
    const navigate = useNavigate()

    return (
        <header className={styles.header}>
            <div>
                <h1>{name}</h1>
                <TextField 
                    value={name}
                    onChange={(value) => renamePresentation(value)}
                />
            </div>
            <Button border={10} onClick={() => navigate('slide-show')}>Слайд-шоу</Button>
        </header>
    )
}

export {
    TopPanel
}