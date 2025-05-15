 import { React , StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
 import {createTheme, ThemeProvider} from "@mui/material";

 const theme = createTheme({
  palette: {
    primary: {
      main: '#1d9bf0', // Or any other blue color you prefer
    },
    // ... other theme configurations
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
    </BrowserRouter>

  </StrictMode>,
);

//
// import { ThemeProvider, createTheme } from '@mui/material/styles';
//
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1d9bf0', // Or any other blue color you prefer
//     },
//     // ... other theme configurations
//   },
// });
//
//  createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ThemeProvider theme={theme}>
//       <App />
//     </ThemeProvider>
//   </StrictMode>
