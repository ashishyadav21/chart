import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableLayout from '../Components/Table/Table'
import Chart from '../Components/Chart/Chart'
import Data from '../Data/demo-data'
import { get } from 'lodash'
import Toggle from '../Components/UI/Toggle/Toggle'

const useStyles = makeStyles({
  ouertConatiner: {
    display: 'flex',
    flex: '1',
  },
  innerContainer : {
    flex: '1', flexWrap: 'wrap' 
  }
})

const MainContainer = () => {
  const classes = useStyles()

  let stateObj = {
    labels: [],
    datasets: [],
  }

  const dataState = {
    label: '',
    fill: false,
    lineTension: 0.5,
    backgroundColor: 'rgba(75,192,192,1)',
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    data: [],
  }

  const filteredMonths = get(Data, '[0]', {})
  const monthsList = Object.keys(filteredMonths)

  const [months, setMonths] = useState(monthsList)
  const [chartData, setChartsData] = useState(stateObj)
  const [toggle, setToggle] = useState(false)
 
  useEffect(() => {
     totalGenderHandler()
  }, [toggle])

  const totalVisitHandler = () => {
    const modifiedDataSet = { ...dataState }
    modifiedDataSet.label = 'Total Visit'

    const labelArray = []
    for (let i in filteredMonths) {
      labelArray.push(filteredMonths[i].total)
    }

    modifiedDataSet.data = labelArray
    const copyOfStateObj = {...stateObj}
    copyOfStateObj.labels = months
    copyOfStateObj.datasets.push(modifiedDataSet)
    setChartsData(copyOfStateObj)
  }

  const totalGenderHandler = () => {
 
    if (!toggle) {
      const modifiedDataSet = { ...dataState }
      const copyOfModifiedDataset = { ...modifiedDataSet }
      modifiedDataSet.label = 'Total Male Visit'
      copyOfModifiedDataset.label = 'Total Female Visit'
      copyOfModifiedDataset.backgroundColor = '#cr5e5r'
      copyOfModifiedDataset.borderColor = 'red'

      const totalMaleVisitedArray = []
      const totalFemaleVisitedArray = []

      for (let i in filteredMonths) {
        const maleValue =
          (filteredMonths[i].total / 100) *
          filteredMonths[i].male.replace(/%|&;\$%@"<>\(\)\+,]/g, '')
        totalMaleVisitedArray.push(maleValue.toFixed())

        const femaleValue =
          (filteredMonths[i].total / 100) *
          filteredMonths[i].female.replace(/%|&;\$%@"<>\(\)\+,]/g, '')
        totalFemaleVisitedArray.push(femaleValue.toFixed())
      }

 
      modifiedDataSet.data = totalMaleVisitedArray
      copyOfModifiedDataset.data = totalFemaleVisitedArray
      stateObj.labels = months
      const copyOfStateObj = {...stateObj}
      copyOfStateObj.datasets.push(modifiedDataSet)
      copyOfStateObj.datasets.push(copyOfModifiedDataset)
      setChartsData(copyOfStateObj)
    }
  }

  const onToggleHandler = (toggleIdentifier) => {
    setToggle(!toggle)
    !!toggleIdentifier && totalVisitHandler()
  }

  return (
    <div className={classes.ouertConatiner}>
      <div className={classes.innerContainer}>
        <TableLayout />
      </div>
      <div className={classes.innerContainer}>
        <Chart data={chartData} />
        <Toggle clicked={(val) => onToggleHandler(val)} value={toggle} />
      </div>
    </div>
  )
}

export default MainContainer
