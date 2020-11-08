import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableLayout from "../Components/Table/Table";
import Chart from "../Components/Chart/Chart";
import Data from "../Data/demo-data";
import { get } from "lodash";
import Toggle from "../Components/UI/Toggle/Toggle"

const useStyles = makeStyles({
  ouertConatiner: {
    display: "flex",
    flex: "1",
  },
});

const MainContainer = () => {
  const classes = useStyles();

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

  const filteredMonths = get(Data, "[0]", {});

  const [months, setMonths] = useState([]);
  const [data, setData] = useState(stateObj);
  const [toggle, setToggle] = useState(false);
  const [dataValue, setDataValue] = useState(dataState);

  useEffect(() => {
      console.log("use-effect-1", Object.keys(filteredMonths))
    setMonths(Object.keys(filteredMonths));
},[]);


  useEffect(() => {
      console.log("use-effect-2")
      totalGenderHandler()
    },[toggle])
   
  
  const totalVisitHandler = () => {
     
    const updatedDataset = { ...dataValue };
    updatedDataset.label = "Total Visit";

    const labelArray = [];
    for (let i in filteredMonths) {
    labelArray.push(filteredMonths[i].total);
    }

    updatedDataset.data = labelArray;
    stateObj.labels = months;
    stateObj.datasets.push(updatedDataset);
    console.log("stateObj -->", stateObj)
    setData(stateObj);
  };

  const totalGenderHandler = () =>{
    console.log("Ashish")
    console.log(months)
    if(!toggle) {
        const updatedDataset = { ...dataValue };
        const newCopyDataset = {...updatedDataset}
        updatedDataset.label = "Total Male Visit";
        newCopyDataset.label = "Total Female Visit"
        newCopyDataset.backgroundColor= "#cr5e5r"
        newCopyDataset.borderColor = "red"
    
        const totalMaleVisitedArray = [];
        const totalFemaleVisitedArray = [];

        for (let i in filteredMonths) {
            const maleValue =  filteredMonths[i].total/100 * filteredMonths[i].male.replace(/%|&;\$%@"<>\(\)\+,]/g, "")
            totalMaleVisitedArray.push(maleValue.toFixed());

            const femaleValue =  filteredMonths[i].total/100 * filteredMonths[i].female.replace(/%|&;\$%@"<>\(\)\+,]/g, "")
            totalFemaleVisitedArray.push(femaleValue.toFixed());
        }

        console.log(totalFemaleVisitedArray)
    
        updatedDataset.data = totalMaleVisitedArray;
        newCopyDataset.data = totalFemaleVisitedArray
        stateObj.labels = months;
        stateObj.datasets.push(updatedDataset);
        stateObj.datasets.push(newCopyDataset);
        setData(stateObj);
    }
  }

  const onToggleHandler = (toggleIdentifier) => {
    !!toggleIdentifier && totalVisitHandler()
    setToggle(!toggle)
    
  }

  return (
    <div className={classes.ouertConatiner}>
      <div style={{ flex: "1", flexWrap: "wrap" }}>
        <TableLayout />
      </div>
      <div style={{ flex: "1", flexWrap: "wrap" }}>
        <Chart data={data} />
        <Toggle clicked = {(value) => onToggleHandler(value)} value={toggle}/>
       </div>
    </div>
  );
};

export default MainContainer;
