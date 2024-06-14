import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./screens/Home";

function App() {
    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
