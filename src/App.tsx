import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Component/Form'; // Update the path accordingly
import Table from './Component/Table'; // Update the path accordingly

const App: React.FC = () => {
  // const [item, setItems] = React.useState([]);

  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/form" element={<Form items={[]} setItems={() => {}} />} />
          <Route path="/table" element={<Table  />} />
          <Route path="/form/:id" element={<Form items={[]} setItems={() => {}}  />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
