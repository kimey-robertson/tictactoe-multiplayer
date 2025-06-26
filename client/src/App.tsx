import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center h-full">
        <Header />
        <Home />
      </div>
    </>
  );
}

export default App;
