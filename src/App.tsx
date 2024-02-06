// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Form from './Component/Form'; 
// // import Table from './Component/Table'; 
// import SagaForm from './Component/SagaForm';
// import SagaTable from './Component/SagaTable';
// // import Reducerform from './Component/Redux/Reduxform';
// // import Reduxtable from './Component/Redux/Reduxtable';

// const App: React.FC = () => {
//   // const [item, setItems] = React.useState([]);
//   return (
    
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* <Route path="/form" element={<Form items={[]} setItems={() => {}} />} />
//           <Route path="/table" element={<Table  />} />
//           <Route path="/form/:id" element={<Form items={[]} setItems={() => {}}  />} /> */}
//           <Route path="/SagaForm" element={<SagaForm  />} /> 
//           <Route path="/SagaForm/:id" element={<SagaForm  />} /> 
//         <Route path="/SagaTable" element={<SagaTable/>} />
//         </Routes> 
//       </div>                                      
//     </Router> 
//   );
// };

// export default App;

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
// import SagaForm from "./Component/SagaForm";
// import SagaTable from "./Component/SagaTable";
import ContextForm from "./UseContext/ContextForm"
import ContextTable from "./UseContext/ContextTable";
import {GlobalProvider} from "./DataContext/ContextState"; 


function App() {
  return (
    <GlobalProvider>

    <>
      <Routes>
        {/* <Route path="/SagaForm" element={<SagaForm />} />
        <Route path="/SagaTable" element={<SagaTable />} />
        <Route path="/SagaForm/:id" element={<SagaForm />} /> */}
        <Route path="/ContextForm" element={<ContextForm />} />
        <Route path="/ContextTable" element={<ContextTable />} />
        <Route path="/ContextForm/:id" element={< ContextForm/>} />
      </Routes>
      {/* <ToastContainer /> */}
    </>
      </GlobalProvider>

  );
}

export default App;