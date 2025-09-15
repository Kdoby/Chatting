import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ChattingPage from "./chatting/ChattingPage";

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <ChattingPage />
    );
}

export default App;
