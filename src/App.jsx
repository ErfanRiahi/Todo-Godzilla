import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/HomePage/Home";
import { History } from "./components/HistoryPage/History";
import { Members } from "./components/MembersPage/Members";
import { AppContexts } from "./contexts/AppContexts";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    profileImage: "",
    isAdmin: false,
    login: false,
  });
  return (
    <AppContexts.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/members" element={<Members />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContexts.Provider>
  );
}

export default App;
