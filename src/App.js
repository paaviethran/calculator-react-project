import "./styles.css";
import {useReducer } from 'react';
import DigitButton from "./components/Button";



// action,payload to access the value
const AppReducer = (state, action) =>{
  switch(action.type){
    case"ADD_DIGIT":
    
    if(state.previousOperation === "0" && state.currentOperation === "0"){
      return state
    }
    if(action.payload === "." && state.currentOperation.includes(".")){
      return state
    }
    if(state.afterCalculate){
      return{
        ...state,
        currentOperation:action.payload,
        afterCalculate:false
      }
    }
    return{
      ...state,
        currentOperation:`${state.currentOperation||""}${action.payload}`
    }
    case"SELECT_OPERATION":
    if(state.currentOperation == null && state.previousOperation == null){
      return state;
    }

    if( state.currentOperation== null){
      return{
        ...state,
        operation:action.payload,
        previousOperation:state.previousOperation,
      }
    }
    if(state.previousOperation == null)
      return{
        ...state,
        operation:action.payload,
        previousOperation:state.currentOperation,
        currentOperation:null,

        // Alternative
        // previousOperation:`${state.currentOperation}${action.payload}`
      }
    
      // what happens when we click on a another operation, the previosuOperation will evalute with the currentOperand
      return{
        ...state,
        operation:action.payload,
        previousOperation:evalute(state),
        currentOperation:null
        
      }
    case"EQUAL":
    return{
      ...state,
      operation:null,
      afterCalculate:true,
      previousOperation:null,
      currentOperation:evalute(state)
    }
      
    case"DELETE_DIGIT":
    if(state.overwrite){
      return{
        ...state,
        overwrite: false,
        currentOperation: null
      }
    }

    if(state.currentOperation == null) return state;
    if(state.currentOperation.length === 1) return {
      ...state,
      currentOperation:null
    };

    return {
      ...state,
      currentOperation: state.currentOperation.slice(0,-1)
    }

    
    case"CLEAR":
    return{}

    default:
      return state
  }    
};

function evalute({previousOperation, currentOperation, operation}){

  let computation = ""
  let previous = parseFloat(previousOperation)
  let current = parseFloat(currentOperation) 
  if(isNaN(current) && isNaN(previous)){
     return ""
  }
  if( operation === "+"){
    computation = previous + current
  }
  else if(operation === "-"){
    computation = previous - current
  }
  else if(operation === "*"){
    computation = previous * current
  }
  else if(operation === "÷"){
    computation = previous / current
  }

 
  return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits:0
})

function formatOperand(operand){
    if(operand == null) return
    // this will split into two value on will be interger and another will be decimal
    const [interger, decimal] = operand.split(".")
    // if we dont have any decimal present will just take the interger part
    if(decimal == null) return INTEGER_FORMATTER.format(interger)
    // or else will take both interger and decimal
    return `${INTEGER_FORMATTER.format(interger)}.${decimal}`


}


//since we only have one layout, theres no need to create Provider to wrap the components we want to give access to
// so theres also no need of AppContext
const App = () =>{
  const [{currentOperation, previousOperation,operation}, dispatch] = useReducer(AppReducer,{})


  return(
    <>
      <div className="calculator-container" >
          <div className="display">
              <div className="previousOperation">
                {formatOperand(previousOperation)}{operation}
              </div>
              <div className="currentOperation">
                {formatOperand(currentOperation)}
              </div>
          </div>
          <div className="btns-group">
            <div className="row first-row">
              <DigitButton value={"AC"} dispatch={dispatch} />
              <DigitButton value={"DEL"} dispatch={dispatch} />
              <DigitButton value={"÷"} dispatch={dispatch} />
            </div>
            <div className="row second-row">
              <DigitButton value={"1"} dispatch={dispatch} />
              <DigitButton value={"2"} dispatch={dispatch} />
              <DigitButton value={"3"} dispatch={dispatch} />
              <DigitButton value={"*"} dispatch={dispatch} />
            </div>
            <div className="row third-row">
              <DigitButton value={"4"} dispatch={dispatch} />
              <DigitButton value={"5"} dispatch={dispatch} />
              <DigitButton value={"6"} dispatch={dispatch} />
              <DigitButton value={"+"} dispatch={dispatch} />
            </div>
            <div className="row forth-row">
              <DigitButton value={"7"} dispatch={dispatch} />
              <DigitButton value={"8"} dispatch={dispatch} />
              <DigitButton value={"9"} dispatch={dispatch} />
              <DigitButton value={"-"} dispatch={dispatch} />
            </div>
            <div className="row forth-row">
              <DigitButton value={"0"} dispatch={dispatch} />
              <DigitButton value={"."} dispatch={dispatch} />
              <DigitButton value={"="} dispatch={dispatch} />
            </div>
          </div>
      </div>
    </>
  );
}

export default  App
