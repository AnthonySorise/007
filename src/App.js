import React, { useState, useEffect } from 'react';
import bondData from './bondData.json';
import FilmTable from './components/FilmTable'
import './App.scss';

function App() {

    const [data, setData] = useState([null]);
    const [selectedKeyValue, setSelectedKeyValue] = useState({});
  
    useEffect(() => {
        setData(bondData);
    }, [])

    useEffect(() => {

        console.log(selectedKeyValue);
            

    }, [selectedKeyValue])

    return (
        <div className="App">
            <FilmTable data={data} selectedKeyValue={selectedKeyValue} setSelectedKeyValue={setSelectedKeyValue}/>
        </div>
    );
}

export default App;
