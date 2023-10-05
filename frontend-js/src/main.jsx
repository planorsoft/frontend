import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { Provider } from "react-redux";
import App from '@/App.jsx'
import store from '@/store'
import theme from '@/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
      </ChakraProvider>
    </Provider>
)


