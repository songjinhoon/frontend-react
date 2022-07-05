import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from '../node_modules/react-router-dom/index';
import { Provider } from '../node_modules/react-redux/es/exports';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '../node_modules/redux-devtools-extension/index';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './module';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
);

reportWebVitals();
