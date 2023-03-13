import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/HomePage/Home";
import { History } from "./components/HistoryPage/History";
import { Members } from "./components/MembersPage/Members";
// import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/members" element={<Members />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
