import logo from './logo.svg';
import './App.css';
import Allroutes from './pages/allRoutes';
import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';


function App() {


  return (
    <div className="App">
      <SnackbarProvider >
      <Allroutes/>
      </SnackbarProvider>
    </div>
  );
}

export default App;
