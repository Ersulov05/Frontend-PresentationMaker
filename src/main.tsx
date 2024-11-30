// import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './App';
// import { getEditor, addEditorChangeHandler } from './store/editor'
import './index.css'
import { store } from './store/redux/store';
import { initHistory } from './store/utils/history.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Обязательно проверьте, что элемент существует

root.render(
    <Provider store={store}>
        <App history={initHistory(store)}/>
    </Provider>
);

// function render() {
//     root.render(
//         <React.StrictMode>
//             <App editor={getEditor()} />
//         </React.StrictMode>
//     );
// }
// // Рендерим приложение
// addEditorChangeHandler(render)
// render()
