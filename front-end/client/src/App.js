import React, {  useState } from "react";
import Routes from "./components/routes";
import { UidContext } from "./components/AppContext";
import Axios from "axios";


const App = () => {
  const [uid] = useState(null);
  

  
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
