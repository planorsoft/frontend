import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from 'react-redux'
import store from './store'
import { Toaster } from "@/components/ui/toaster"


import '@/assets/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Toaster />
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)