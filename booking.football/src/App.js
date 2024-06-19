import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./screens/Home";
import BookingScreen from "./screens/BookingScreen";

function App() {
    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/book/:courtId" element={<BookingScreen />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
