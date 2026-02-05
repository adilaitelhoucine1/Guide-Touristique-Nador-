import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} children={""}>
    <App />
  </Provider>
)
