import React, {useState, useEffect } from 'react';
import Plot from 'react-plotly.js';   

function App() {
  
  // PIE CHART
  const [chartState, setchartState] = useState({
    data: [],
    layout: {
      width: 800,
      height: 400,
      title: 'My first diagram'
    },
    frames: [],
    config: {}
  });

  useEffect(() => {
    let newChartData = {
      type: 'pie',
      values: [],
      labels:[] 
    };

    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fbe2e7e0b56f9bf6b6494c16e380deb4')
      .then(response => response.json())
      .then(data => {
        data.results.forEach(item => {
          newChartData.labels.push(item.title);
          newChartData.values.push(item.popularity);
        });

        let newChartState = {
          ...chartState,
          data: [newChartData]
        };

        setchartState(newChartState);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  // BAR CHART
  const [barChartState, setBarChartState] = useState({
    data: [],
    layout: {
      width: 800,
      height: 400,
      title: 'Bar chart'
    },
    frames: [],
    config: {}
  });
  
  useEffect(() => {
    let newBarChartData = {
      x: [],
      y:[],
      type: 'bar'
    };
    fetch("https://age-of-empires-2-api.herokuapp.com/api/v1/units")
    .then(response => response.json())
    .then(data => {
      data.units.forEach(unit => {
        newBarChartData.x.push(unit.name)
        newBarChartData.y.push(unit.attack)
      });
      

      let newBarChartState = {
        ...barChartState,
        data: [newBarChartData],
      }
  
      setBarChartState(newBarChartState);
      console.log(data)

    })
    .catch(error => {
      console.log(error)
    })

  }, [])

  return (
    <>     
     <Plot
        data={barChartState.data}
        layout={barChartState.layout}
        frames={barChartState.frames}
        config={barChartState.config}
        onInitialized={(figure) => setBarChartState(figure)}
        onUpdate={(figure) => setBarChartState(figure)}
      />

      <Plot
        data={chartState.data}
        layout={chartState.layout}
        frames={chartState.frames}
        config={chartState.config}
        onInitialized={(figure) => setchartState(figure)}
        onUpdate={(figure) => setchartState(figure)}
      />
    </>
  )
};

export default App;