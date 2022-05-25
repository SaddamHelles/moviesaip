import { MainContainer } from "./Global.Styles";
import Nav from "./Components/Nav/Nav";
import HomeScreen from "./Screen/HomeScreen/HomeScreen";
import MovieScreen from "./Screen/MovieScreen/MovieScreen";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./Components/Themes/useDarkMode";
import { GlobalStyles } from "./Components/Themes/globalStyles";
import { lightTheme, darkTheme } from "./Components/Themes/Themes";
import Toggle from "./Components/Themes/Toggler";

function App() {
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  return (
    <MainContainer>
      {/* <Toggle theme={theme} toggleTheme={themeToggler} /> */}
      <Nav />

      <Routes>
        <Route path={"/"} element={<HomeScreen />} />
        <Route path={"/movies/:id"} element={<MovieScreen />} />
      </Routes>
    </MainContainer>
  );
}

export default App;
