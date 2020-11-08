import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { get } from "lodash";
import {withRouter} from "react-router-dom"

const Chart = (props) => {
    
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


  const query = new URLSearchParams(props.location.search);
  const monthFromQueryString = query.get('month')
  const totalFromQueryString = query.get('total')
  const maleFromQueryString = query.get('male')
  const femaleFromQueryString = query.get('female')

 

 const [chartState, setChartState] = useState(dataState)

  const state = props.data || chartState;
  const label = get(state.datasets, "[0].label")


  useEffect(() => {
    stateObj.labels.push(monthFromQueryString)
    const modifiedChartState = { ...chartState };
    const copyOfModifiedChartState = {...modifiedChartState}
    modifiedChartState.label = "Total Male Visit";
    copyOfModifiedChartState.label = "Total Female Visit"
    copyOfModifiedChartState.backgroundColor= "#cr5e5r"
    copyOfModifiedChartState.borderColor = "red"

    const totalMaleVisitedArray = [];
    const totalFemaleVisitedArray = [];
    
    const maleValue =  totalFromQueryString/100 * maleFromQueryString
  
    totalMaleVisitedArray.push(maleValue.toFixed());

    const femaleValue =  totalFromQueryString/100 * femaleFromQueryString
    totalFemaleVisitedArray.push(femaleValue.toFixed());
    modifiedChartState.data = totalMaleVisitedArray;
    copyOfModifiedChartState.data = totalFemaleVisitedArray
    stateObj.datasets.push(modifiedChartState);
    stateObj.datasets.push(copyOfModifiedChartState);
    setChartState(stateObj);
},[])

  
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
