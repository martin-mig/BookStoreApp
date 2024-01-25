import React from 'react';
import './App.css';
import { useState } from "react";
import { RouterPrincipal } from './routers/RouterPrincipal';

function App() {
    localStorage.clear();
    return(
        <RouterPrincipal></RouterPrincipal>
    )
}

export default App;
