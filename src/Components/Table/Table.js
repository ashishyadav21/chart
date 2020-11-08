import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";
import Data from "../../Data/demo-data";
import { get } from "lodash";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

const TableLayout = (props) => {
  var monthsIntoArray = [];
  const classes = useStyles();

  const months = get(Data, "[0]", {});
  const tableHeaderRowData = ["Months", ...Object.keys(months.jan)];

  Object.keys(months).forEach((key) => {
    monthsIntoArray.push(<option value={key}>{months[key]}</option>);
  });

  const tableHandler = (monthData) => {
      console.log("monthData -->",monthData)
    
      const queryParams = [];
      for (let i in monthData.props.children) {
          queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(monthData.props.children[i].replace(/%|&;\$%@"<>\(\)\+,]/g, "")));
      }
      queryParams.push('month=' + monthData.props.value);
      const queryString = queryParams.join('&');
      console.log("queryString -->", queryString)
      props.history.push({
          pathname: '/details',
          search: '?' + queryString
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeaderRowData.map((rowData, index) => (
              <TableCell key={index} align="right">{rowData}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {monthsIntoArray.map((monthData) => (
            <TableRow key={monthData.name} onClick={() => tableHandler(monthData)}>
              <TableCell align="right">{monthData.props.value}</TableCell>
              <TableCell align="right">
                {monthData.props.children.male}
              </TableCell>
              <TableCell align="right">
                {monthData.props.children.total}
              </TableCell>
              <TableCell align="right">
                {monthData.props.children.visited}
              </TableCell>
              <TableCell align="right">
                {monthData.props.children.female}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(TableLayout);
