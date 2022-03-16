import { StrictMode } from 'react';
import ReactDom from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDom.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
