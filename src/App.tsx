import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { PageRoutes } from "./constants/PageRoutes";
import Bookmarks from "./pages/Bookmarks";
import Characters from "./pages/Characters";
import DetailedCharacter from "./pages/Characters/id";
import Comics from "./pages/Comics";
import DetailedComic from "./pages/Comics/id";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import DetailedStory from "./pages/Stories/id";
import { persistor, store } from "./redux/store/store";

import "./utils/apiSocket";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Routes>
            <Route path={PageRoutes.HOME} element={<Home />} />
            <Route path={PageRoutes.CHARACTERS} element={<Characters />} />
            <Route
              path={PageRoutes.CHARACTERS + "/:id"}
              element={<DetailedCharacter />}
            />
            <Route path={PageRoutes.COMICS} element={<Comics />} />
            <Route
              path={PageRoutes.COMICS + "/:id"}
              element={<DetailedComic />}
            />
            <Route path={PageRoutes.STORIES} element={<Stories />} />
            <Route
              path={PageRoutes.STORIES + "/:id"}
              element={<DetailedStory />}
            />
            <Route path={PageRoutes.BOOKMARKS} element={<Bookmarks />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
