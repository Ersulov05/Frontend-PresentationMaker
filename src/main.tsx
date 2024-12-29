import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { store } from './store/redux/store';
import { initHistory } from './store/utils/history.ts';
import { initLocalStorage } from './store/utils/localStorage.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!)

initLocalStorage(store)

root.render(
    <Provider store={store}>
        <App history={initHistory(store)} />
    </Provider>
)