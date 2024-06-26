import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Reset from "./Reset";
import Header from "./component/Header";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import Pager from "./component/Pager";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PagerProvider } from "./context/pagerContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const currentTheme = theme === "light" ? darkTheme : lightTheme;

  const mobileModalHandler = () => {
    setIsModalOpen(!isModalOpen);
    console.log("click");
  };

  const Modal = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 99;

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const StyledIcon2 = styled(FontAwesomeIcon)`
    top: 45px;
    right: 45px;
    z-index: 999;
    font-size: 2rem;
    position: absolute;
    cursor: pointer;
    color: #fff;
  `;

  const ModalControl = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    font-size: 3rem;
    a {
      color: #eee;
      transition: all 0.3s;
      text-transform: uppercase;
    }
    & a:hover {
      color: #72869f;
    }
  `;

  return (
    <ThemeProvider theme={currentTheme}>
      <Reset />
      <BrowserRouter>
        <PagerProvider>
          <Header
            toggleTheme={toggleTheme}
            mobileModalHandler={mobileModalHandler}
          />
          {isModalOpen && (
            <Modal>
              <StyledIcon2 icon={faX} onClick={mobileModalHandler} />
              <ModalControl>
                <Link to="/" onClick={mobileModalHandler}>
                  Home
                </Link>
                <Link to="/about" onClick={mobileModalHandler}>
                  About
                </Link>
                <Link to="/projects" onClick={mobileModalHandler}>
                  Projects
                </Link>
              </ModalControl>
            </Modal>
          )}
          <Pager />
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/mySkills" element={<Skills />} />
              {/* <Route path="/production/" element={<Production />} /> */}
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </AnimatePresence>
        </PagerProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
