
import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import { RouterProvider } from 'react-router-dom';
function App() {
  return (
    <>
      <HelmetProvider>

      <AppRouters/>
      </HelmetProvider>
    </>
    
   
  );
}

export default App;
