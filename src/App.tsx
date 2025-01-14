import { HistoryType } from './store/utils/history.ts';
import { BrowserRouter, Route, Routes } from 'react-router';
import Editor from './views/Editor/Editor.tsx';
import SlideShow from './views/SlideShow/SlideShow.tsx';
import { useAppActions } from './views/hooks/useAppActions.ts';
import { useEffect } from 'react';

type AppProps = {
    history: HistoryType,
}

function App({
    history
}: AppProps) {
    
    const {
        addKeyToSetKeys,
        removeKeyToSetKeys,
    } = useAppActions()
    
    const handleKeyDown = (event: KeyboardEvent) => {
        addKeyToSetKeys(event.key)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        removeKeyToSetKeys(event.key)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        };
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<Editor history={history}/>} 
                />
                <Route 
                    path="slide-show" 
                    element={<SlideShow />} 
                />
            </Routes>
        </BrowserRouter>  
    )
}

export default App
