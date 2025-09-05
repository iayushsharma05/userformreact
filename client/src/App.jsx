import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Adduser from '../components/adduser';
import Search from '../components/search';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/searchuser" element={<Search />} />
        <Route path="/" element={<Adduser />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App; 