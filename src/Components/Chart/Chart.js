import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { get } from "lodash";
import {withRouter} from "react-router-dom"


const demoState = {
    labels: [],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }


 
  

const Chart = (props) => {
  console.log("charts-props -->", props)

  let stateObj = {
    labels: [],
    datasets: [],
  };

  const dataState = {
    label: "",
    fill: false,
    lineTension: 0.5,
    backgroundColor: "rgba(75,192,192,1)",
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 2,
    data: [],
  }


  const [monthData, setMonthData] = useState({})
  const [month, setMonth] = useState([])
  const [chartState, setChartState] = useState(dataState)
  const state = props.data || chartState;
  const label = get(state.datasets, "[0].label")




  useEffect(() => {
      if(props.location.search) {
    const query = new URLSearchParams(props.location.search);
    const monthDataobj = {};
    let month = 0;
    for ( let param of query.entries() ) {
        if (param[0] === 'month') {
            month = param[1];
        } else {
            monthDataobj[param[0]] = +param[1];
        }
    }
    console.log(monthDataobj,"monthDataobj")
    setMonthData(monthDataobj)
    setMonth(month)
    console.log("chartState -->", monthData)
      }
  },[])


  useEffect(() => {

    stateObj.labels.push(month)
    const updatedDataset = { ...chartState };
    const newCopyDataset = {...updatedDataset}
    updatedDataset.label = "Total Male Visit";
    newCopyDataset.label = "Total Female Visit"
    newCopyDataset.backgroundColor= "#cr5e5r"
    newCopyDataset.borderColor = "red"

    const totalMaleVisitedArray = [];
    const totalFemaleVisitedArray = [];

    
        const maleValue =  monthData.total/100 * monthData.male
        console.log("maleValue-->", maleValue)
        totalMaleVisitedArray.push(maleValue.toFixed());

        const femaleValue =  monthData.total/100 * monthData.female
        totalFemaleVisitedArray.push(femaleValue.toFixed());


    console.log(totalFemaleVisitedArray)

    updatedDataset.data = totalMaleVisitedArray;
    newCopyDataset.data = totalFemaleVisitedArray
    stateObj.datasets.push(updatedDataset);
    stateObj.datasets.push(newCopyDataset);
    setChartState(stateObj);
},[])

  console.log(chartState,month)
  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: label,
            fontSize: 10,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default withRouter(Chart);
