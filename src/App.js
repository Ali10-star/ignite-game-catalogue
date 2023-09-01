import Home from "./pages/Home";
import GlobalStyels from "./components/GlobalStyles";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";

function App() {

  return (
    <div className="App">
      <GlobalStyels />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game/:id' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
