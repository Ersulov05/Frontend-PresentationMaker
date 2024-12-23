import { HistoryType } from './store/utils/history.ts';
import { BrowserRouter, Route, Routes } from 'react-router';
import Editor from './views/Editor/Editor.tsx';
import SlideShow from './views/slideShow/SlideShow.tsx';

type AppProps = {
    history: HistoryType,
}

function App({history}: AppProps) {
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
