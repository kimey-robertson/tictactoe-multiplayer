import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "16px",
            padding: "12px 16px",
            maxWidth: "90vw",
          },
        }}
      />
      <div className="flex flex-col items-center justify-center h-full min-h-screen">
        <Header />
        <Home />
      </div>
    </>
  );
}

export default App;
