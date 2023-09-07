import React from 'react';
import './App.css';
import { useState } from "react";
import { TabPaneNB } from './components/TabPaneNB';
import { FileTable } from './components/FileTable';
import { CheckboxInput } from './components/CheckboxInput';
import { RouterPrincipal } from './routers/RouterPrincipal';

function App() {
    return(
        <RouterPrincipal></RouterPrincipal>
    )
  
}

export default App;
