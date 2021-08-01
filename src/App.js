import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import bondData from './bondData.json';
import FilmTable from './components/FilmTable'
import FilmPieChart from './components/FilmPieChart'
import './App.scss';

function App() {

    const [data, setData] = useState([null]);
    const [selectedKeyValuePair, setselectedKeyValuePair] = useState({});
  
    useEffect(() => {
        setData(bondData);
    }, [])

    useEffect(() => {

        console.log(selectedKeyValuePair);
            

    }, [selectedKeyValuePair])

    return (
        <div className="App">
            <Grid container>
                <Grid item sm={12} md={9}>
                    <FilmTable data={data} selectedKeyValuePair={selectedKeyValuePair} setselectedKeyValuePair={setselectedKeyValuePair} />
                </Grid>
                <Grid item sm={12} md={3}>
                    <FilmPieChart data={data} selectedKeyValuePair={selectedKeyValuePair} width={"50vw"} height={"50vw"} innerRadius={60} outerRadius={100}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
