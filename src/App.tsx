import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import JourneyDetails from './JourneyDetails';

function App() {

  interface IFormData {
		firstPostCode: string;
		secondPostCode: string;
	}

  const clearFormData = () => {
		return {
			firstPostCode: "",
			secondPostCode: ""
		};
	};

	const [formValues, setFormValues] = useState<IFormData>(clearFormData());
  const [result,setResult] = useState('');

  const onFormValueChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setFormValues({...formValues,[e.target.name] : e.target.value});
  } 

  const handleCLick = async () =>{
    const response = await axios.get(`https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=${formValues.firstPostCode},${formValues.secondPostCode}`);
    console.log(response);
    if(response){
      setResult(response.data);
    }
  }

  useEffect(()=>{
    clearFormData();
})

  return (
    <div className="App">
      <h2>Journey Calculation</h2>
      <form>
        <label>Enter first endpoint</label>
        <input
          type="text" 
          id='firstEndpoint'
          name='firstEndpoint'
          onChange={onFormValueChange}         
          value={formValues.firstPostCode}
        />
        <br/>
         <label>Enter second endpoint</label>
        <input
          type='text'
          id='secondEndpoint'
          onChange={onFormValueChange}
          name='secondEndpoint'
          value={formValues.secondPostCode}
        />
        <br/>
        <button type='button' onClick={handleCLick}> Calculate Journey</button>
      </form> 
      {result!= '' ? (<JourneyDetails milesToTravel={result.split(',')[0]} travelTime={result.split(',')[1]}/>) : (<></>)}
    </div>
  );
}

export default App;
