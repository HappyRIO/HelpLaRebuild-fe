import { Route, Routes } from "react-router-dom";
import ChatInterface from "./pages/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
      </Routes>
    </>
  );
}

export default App;
