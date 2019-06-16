import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Cancel from "@material-ui/icons/Delete";

import Close from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Edit from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import AutoComplete from 'material-ui/AutoComplete';
import Button from "@material-ui/core/Button/Button";
import TableCell from "@material-ui/core/TableCell/TableCell";
var update = require('immutability-helper');
const uuidv1 = require('uuid/v1');

const styles = theme => ({
  root: {
    width: '100%'
  },
  addMedicineContainer:{
   padding: '0px 0 0 50px',
    marginTop: '30px'
  },
  medicineListElem:{
    padding: '0 0 0 50px',
    height:'250px' ,
    maxHeight:'300px',
    position:'relative',
    overflowY:'auto',
    overflowX:'hidden',
    marginTop: '30px'
  },
  medtextField:{
    width:'80%',
    margin:'0px',
    padding:'0px'
  },
  searchKeyword:{
    color: '#000000',
    cursor:'pointer',
    borderBottom:'1px solid #D1D2D7',
    '&:hover': {
      color: '#59B0F6',
    },
    marginLeft:'-5px',
    padding:'5px 0px',
    width:'100%',
    overflowY:'auto',
    overflowX:'hidden'
  },
  mainContainer: {
    textAlign: 'justify',
    width: '100%'
  },
  treatmentNameHeader: {
    width: '300px',
    verticalAlign: 'top',
    display: 'inline-block'
  },
  addMedReqTextFields: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  treatmentNameTextField: {
    marginTop: '-10px',
    marginLeft: '8px'

  },
  editTreatmentBtn:{
    verticalAlign: 'top',
    display: 'inline-block'
  },
  deleteTreatmentBtn:{
    float: 'right',
    verticalAlign: 'top',
    display: 'inline-block'
  },
  addMedicineBtn:{
    position: 'relative',
    zIndex:'100',
    float: 'right',
    marginRight:'1%',
    marginTop:'-2%'
  },
  treatmentDesciptionTextField:{
    padding: '0 0 0 35px'
  },
  textfieldProductName:{
    fontSize:'14px',
    width:'183px',
    margin:'0px',
    padding:'0px 0 0 20px',
    borderRadius:'3px 3px 0px 0px',
    borderTop:'1px solid rgb(221, 219, 219)',
    borderLeft:'1px solid rgb(221, 219, 219)',
    borderRight:'1px solid rgb(221, 219, 219)',
    borderBottom:'1px solid rgb(221, 219, 219)',
  },
  textfieldForMedicine:{
    fontSize:'14px',
    width:'80%',
    margin:'0px',
    padding:'0px 0 0 20px',
    borderRadius:'3px 3px 0px 0px',
    borderTop:'1px solid rgb(221, 219, 219)',
    borderLeft:'1px solid rgb(221, 219, 219)',
    borderRight:'1px solid rgb(221, 219, 219)',
    borderBottom:'1px solid rgb(221, 219, 219)',
  },
  suggestionListDialogue:{
    // borderTop:'1px solid rgb(221, 219, 219)',
    borderBottom:'1px solid rgb(221, 219, 219)',
    borderLeft:'1px solid rgb(221, 219, 219)',
    borderRight:'1px solid rgb(221, 219, 219)',
    zIndex:'100',
    backgroundColor: '#ffffff' ,
    maxHeight:'200px',
    width:'183px',
    position:'absolute',
    overflow:'auto',
    marginTop:'0px'
  }
});


class TreatmentMedView extends React.Component{

  constructor(props) {
    super(props);

    this.state={
      medicineFromTreatment : [],
      NewMedType:'',
      NewMedStrength:'',
      MedOnchange:false,
      MedData:[],
      MedFiltered:[],
      MedList:[],
      MedFlag:false,
      TempMedValue:'',

      TempStrenValue:'',
      StrenList:[],

      TempTypValue:'',
      TypeList:[],

      TempFreqValue:'',
      FreqList:[],

      TempRemValue:'',
      RemList:[],

      TreatmentName:'',
      TreatmentDescription:''
    }
  }

  componentWillMount(){
    this.setState({
      medicineFromTreatment : this.props.treatmentDetails.treatment_medicine_list,
      MedData : this.props.medList,
      TreatmentName: this.props.treatmentDetails.name,
      TreatmentDescription: this.props.treatmentDetails.description
    });
  }

  removeAllMedicine = i =>{
    let x =  i;
    console.log(x);
    this.setState(state => {
      const medicineFromTreatment = state.medicineFromTreatment.filter((item, j) => x !== j);
      return {
        medicineFromTreatment
      };
    });
  };
  onUpdateMed = (val) => {
    let target = val.target;
    let value = target.value;
    let id = target.id;
    const name = target.name;

    console.log(target);
    console.log(name);

    console.log(id);
    let medicineFromTreatment = this.state.medicineFromTreatment;

    let commentIndex = medicineFromTreatment.findIndex(function(c) {
      console.log(id);
      return `${c.treatment_medicine_id}` === id;
    });
    console.log(commentIndex);


    let updatedComment;
    switch (name) {
      case 'product_name':
        updatedComment = update(medicineFromTreatment[commentIndex], {product_name: {$set: value}});
        break;
      case 'types':
        updatedComment = update(medicineFromTreatment[commentIndex], {types: {$set: value}});
        break;
      case 'strength':
        updatedComment = update(medicineFromTreatment[commentIndex], {strength: {$set: value}});
        break;
      case 'generic':
        updatedComment = update(medicineFromTreatment[commentIndex], {generic: {$set: value}});
        break;
      case 'indication':
        updatedComment = update(medicineFromTreatment[commentIndex], {indication: {$set: value}});
        break;
      case 'frequency':
        updatedComment = update(medicineFromTreatment[commentIndex], {frequency: {$set: value}});
        break;
      case 'remark':
        updatedComment = update(medicineFromTreatment[commentIndex], {remark: {$set: value}});
        break;
    }

    var newData = update(medicineFromTreatment, {
      $splice: [[commentIndex, 1, updatedComment]]
    });
    this.setState({medicineFromTreatment: newData});
  };

  MedicineSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({MedOnChange:true,MedFlag:false})
    if( keyword == ""){
      this.setState({MedOnChange:false})
    }
    this.setState({ TempMedValue: event.target.value });
    let filtered = this.state.MedData.filter((item)=>{
      return item.product_name.toUpperCase().indexOf(keyword.toUpperCase()) > -1;
    });
    this.setState({
      MedFiltered:filtered,
      MedOnChange:true
    })
  };
  StrenSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempStrenValue:keyword});
  };
  TypeSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempTypValue:keyword});
  };
  FreqSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempFreqValue:keyword});
  };
  RemarkSearchKeywords = (event)=>{
    let keyword = event.target.value;
    this.setState({TempRemValue:keyword});
  };

  handleAddNewMedicine=()=>{
    console.log("Add medicine");

    console.log(uuidv1());
    let generatedID = Math.floor(Math.random() * 100) +50;

    let len = this.state.medicineFromTreatment.length;

    let MedVal = this.state.TempMedValue;
    let StrenVal = this.state.TempStrenValue;
    if(StrenVal == '')StrenVal = "N/A";

    let TypVal = this.state.TempTypValue;
    if(TypVal == '')TypVal = "N/A";

    let RemVal = this.state.TempRemValue;
    if(RemVal == '')RemVal = "N/A";

    let FreqVal = this.state.TempFreqValue;
    if(FreqVal == '')FreqVal = "N/A";

    let fl = 1;

    if(fl==1){
      this.setState((prevState) => ({
        medicineFromTreatment: [...prevState.medicineFromTreatment, {treatment_medicine_id:generatedID, product_name:MedVal, types:TypVal, strength: StrenVal, frequency: FreqVal, remark: RemVal}]
      }));
    }
    this.setState({
      TempMedValue:'',
      TempFreqValue:'',
      TempTypValue:'',
      TempRemValue:'',
      TempStrenValue:''
    });

  };

  addMed=(item)=>{
    this.setState({
      TempMedValue:`${item.product_name}`,
      TempStrenValue:`${item.strength}`,
      TempTypValue:`${item.types}`,
      MedFlag:true
    });
  };

  handleEditTreatmentChangeKeyword=(event)=>{
    this.setState({
      TreatmentName: event.target.value
    })
  };
  handleEditTreatmentDescriptionChangeKeyword=(event)=>{
    this.setState({
      TreatmentDescription: event.target.value
    })
  };
  handleCloseTreatmentDialogue =(event)=>{
    this.props.closeTreatmentUpdateDialogue();
  };


  updateTratment=(event)=>{
    const {medicineFromTreatment , TreatmentName, TreatmentDescription} = this.state;

    console.log("Medicine List :" , medicineFromTreatment);
    console.log("Treatment name :" , TreatmentName);
    console.log("Description :" , TreatmentDescription);

    //check if the treatment is changed
    const {treatment_id, name , description , treatment_medicine_list} = this.props.treatmentDetails;

    if (name === TreatmentName && description === TreatmentDescription && treatment_medicine_list === medicineFromTreatment){
      const msg ='Treatment is up to date!';
      this.props.openSnackBar(msg , 'info');
    }else{
      const requestBody ={
        name: TreatmentName,
        description: TreatmentDescription,
        treatment_medicine_list: medicineFromTreatment
      };
      console.log("Request body :" , requestBody);
      this.props.updateTreatmentMedicine(requestBody, treatment_id);



    }

  };
  closeSuggestion = (event) =>{
    console.log("CLICKED!");
    this.setState({
      MedFlag:true
    });
  };
  handleDeleteTreatmentDiaglogBox=(event)=>{
    console.log("treatment delete request");
    console.log("Props " , this.props);

    const {treatment_id} = this.props.treatmentDetails;
     this.props.deleteTreatment(treatment_id);

     //close the dialogue box
    this.props.onDeleteTreatment();
  };
  render(){
    const { classes } = this.props;
    const {medicineFromTreatment , TreatmentName, TreatmentDescription} = this.state;

    console.log("Props " , this.props.treatmentDetails);
    console.log("State " , this.state);

    const MedicineSuggestions = this.state.MedOnChange?this.state.MedFiltered.map((item)=>{
      return(
        <li key={item.medicine_id} onClick={()=>this.addMed(item)} className={classes.searchKeyword}>
          {item.product_name} <span><i> {item.types} </i></span> {item.strength}
        </li>
      )
    }):null;

    return(
      <div className={classes.root}>
      <Grid container className={classes.root}>
        <div className={classes.mainContainer}>
          <Typography variant="h6" id="tableTitle"  className={classes.treatmentNameHeader}>
            <NoteAdd />
            <TextField InputProps={{disableUnderline: true}} id="treatment-name" className={classes.treatmentNameTextField} value={TreatmentName} onChange={this.handleEditTreatmentChangeKeyword.bind(this)} margin="normal"/>
          </Typography>
          <div className={classes.deleteTreatmentBtn}>
            <Tooltip title="Delete Treatment" aria-label="Add">
              <Fab style={{background:'red'}} size="small" onClick={this.handleDeleteTreatmentDiaglogBox}>
                <DeleteIcon/>
              </Fab>
            </Tooltip>
          </div >
          <div className={classes.treatmentDesciptionTextField}>
            <TextField  InputProps={{disableUnderline: true}} id="treatment-description" label="Description" value={TreatmentDescription} onChange={this.handleEditTreatmentDescriptionChangeKeyword.bind(this)} margin="normal"/>
          </div>
        </div>
          <div className={classes.addMedicineContainer}>
          <Grid container>
            <Grid item xs={3}>
              <TextField placeholder="Type a Medicine Name" id="" value={this.state.TempMedValue} onChange={this.MedicineSearchKeywords} margin="normal" className={classes.textfieldProductName}
                         InputProps={{
                           disableUnderline: true,
                           endAdornment: <IconButton
                             onClick={this.closeSuggestion}>
                             <Close  style={{color:'#7f7f7f', fontSize:'18px'}}/>
                           </IconButton>
                         }}

              />
              {!this.state.TempMedValue=="" && !this.state.MedFlag?
                <div className={classes.suggestionListDialogue}>
                  <ul style={{marginTop:'-1px', padding:'10px' }}>
                    {!this.state.TempMedValue=="" && !this.state.MedFlag?MedicineSuggestions:null}
                  </ul>
                </div>:null
              }
            </Grid>
            <Grid item xs={2}>
              <TextField id="strength" placeholder="Strength" className={classes.textfieldForMedicine} value={this.state.TempStrenValue} onChange={this.StrenSearchKeywords} margin="normal" style={{fontSize:'14px'}}
                         InputProps={{
                           disableUnderline: true}}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField id="type" placeholder="Type" className={classes.textfieldForMedicine} value={this.state.TempTypValue} onChange={this.TypeSearchKeywords} margin="normal" style={{fontSize:'14px'}}
                         InputProps={{
                           disableUnderline: true}}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField id="frequency" placeholder="Frequency" className={classes.textfieldForMedicine} value={this.state.TempFreqValue} onChange={this.FreqSearchKeywords} margin="normal" style={{fontSize:'14px'}}
                         InputProps={{
                           disableUnderline: true}}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField id="remark" placeholder="Remark" className={classes.textfieldForMedicine} value={this.state.TempRemValue} onChange={this.RemarkSearchKeywords} margin="normal" style={{fontSize:'14px'}}
                         InputProps={{
                           disableUnderline: true}}
              />
            </Grid>
            <Tooltip title="Add Medicine">
              <IconButton onClick={this.handleAddNewMedicine} style={{marginTop:'-4px'}}>
                <AddIcon style={{color:'#7f7f7f'}}/>
              </IconButton>
            </Tooltip>
          </Grid>
          </div>
          <div className={classes.medicineListElem}>
            {medicineFromTreatment != null ?
              medicineFromTreatment.map((itemx,index) => (
                <Grid container key={index} style={{marginTop:'10px'}}>
                  <Grid item xs={3}>
                    <TextField InputProps={{className: classes.customInputField}} id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.product_name==null? '' : itemx.product_name} className={classes.medtextField} name={`product_name`} margin="normal" style={{fontSize:'14px'}}/>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField InputProps={{className: classes.customInputField}} id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.types==null? '' : itemx.types} className={classes.medtextField} name={`types`} margin="normal" style={{fontSize:'14px'}}/>
                  </Grid>
                  {/*<Grid item xs={2}>*/}
                    {/*<TextField id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.generic==null? '' : itemx.generic} className={classes.medtextField} name={`generic`}  margin="normal" style={{fontSize:'14px'}}/>*/}
                  {/*</Grid>*/}
                  <Grid item xs={2}>
                    <TextField InputProps={{className: classes.customInputField}} id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.strength==null? '' : itemx.strength} className={classes.medtextField} name={`strength`}  margin="normal" style={{fontSize:'14px'}}/>
                  </Grid>
                  {/*<Grid item xs={2}>*/}
                    {/*<TextField id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.indication==null? '' : itemx.indication} className={classes.medtextField} name={`indication`}  margin="normal" style={{fontSize:'14px'}}/>*/}
                  {/*</Grid>*/}
                  <Grid item xs={2}>
                    <TextField InputProps={{className: classes.customInputField}} id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.frequency==null? '' : itemx.frequency} className={classes.medtextField} name={`frequency`}  margin="normal" style={{fontSize:'14px'}}/>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField InputProps={{className: classes.customInputField}} id={`${itemx.treatment_medicine_id}`} onChange={this.onUpdateMed.bind(this)} value={itemx.remark==null? '' : itemx.remark} className={classes.medtextField} name={`remark`}  margin="normal" style={{fontSize:'14px'}}/>
                  </Grid>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => this.removeAllMedicine(index)} >
                      <Cancel style={{color:'#7f7f7f'}}/>
                    </IconButton>
                  </Tooltip>

                  {/*<Grid item xs={3}>*/}
                     {/*<IconButton onClick={() => this.removeAllMedicine(index)} style={{marginTop:'-40px',marginLeft:'80%'}}>*/}
                      {/*<Cancel style={{color:'#7f7f7f'}}/>*/}
                    {/*</IconButton>*/}
                  {/*</Grid>*/}
                </Grid>
              ))
              : null}
          </div>

      </Grid>

        <Button onClick={this.updateTratment} color="primary">
          Update
        </Button>
        <Button onClick={this.handleCloseTreatmentDialogue} color="primary">
          Cancel
        </Button>
      </div>
    )
  }
}
export default withStyles(styles)(TreatmentMedView);
