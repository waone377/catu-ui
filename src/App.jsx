import { HashRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";
import Main from "./pages/Main";
import Catetan from "./pages/Catatan";
import Navbar from "./componens/Navbar";
function App() {
  return (
    <>
      <HashRouter>
        <GlobalProvider>
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="catatan" element={<Catetan />} />
            </Routes>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Navbar />
          </div>
        </GlobalProvider>
      </HashRouter>
    </>
  );
}

export default App;
