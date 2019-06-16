import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 8,
    height: "100%",
  },
});


class AppHelp extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    const { classes } = this.props;

    return(
      <Grid container className={classes.root}>
        <h1> This is still under construction! </h1>
        <p>If you have any question or request, please drop a msg to +4915758475992</p>
      </Grid>
    )
  }
}
export default withStyles(styles)(AppHelp);
