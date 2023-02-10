import NavigationContext from "./context/navigationContext";

import { HelmetProvider } from 'react-helmet-async';
import AppRouters from './router';
import React,{useMemo,useState} from "react";
function App() {
  const [component, setComponent] = useState("");

  const navigationValue = useMemo(() => ({ component, setComponent }), [component]);
  return (
    <>
      <HelmetProvider>
      <NavigationContext.Provider value={navigationValue}>
      <AppRouters/>
      </NavigationContext.Provider>

      </HelmetProvider>
    </>
    
   
  );
}

export default App;
