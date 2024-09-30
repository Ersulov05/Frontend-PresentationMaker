import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PresentationProvider } from './PresentationContext';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!); // Обязательно проверьте, что элемент существует

// Рендерим приложение
root.render(
    <React.StrictMode>
        <PresentationProvider>
            <App />
        </PresentationProvider>
    </React.StrictMode>
);
