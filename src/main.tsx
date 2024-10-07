import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getEditor, addEditorChangeHandler } from './store/editor'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!); // Обязательно проверьте, что элемент существует

function render() {
    root.render(
        <React.StrictMode>
            <App editor={getEditor()} />
        </React.StrictMode>
    );
}
// Рендерим приложение
addEditorChangeHandler(render)
render()
