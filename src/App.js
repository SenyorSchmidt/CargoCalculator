import './App.css';
import {useReducer, useState} from "react";


function App() { 
  const [volumetricWeight, setVolumetricWeight] = useState(0);
  const [formData, setFormData] = useState({height: "", broadth: "", width: "", amount: "", weight: "0"})

  function landCalculator(height, broadth, width, amount) {
    setVolumetricWeight( height * broadth * width * 333 * amount);
  }

  function seaCalculator(height, broadth, width, amount) {
    setVolumetricWeight(height * broadth * width * amount);
  }

  function airCalculator(height, broadth, width, amount) {
    setVolumetricWeight( height * broadth * width * 167 * amount);
  }

  function changeHandler(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function clearAll(){
    setFormData({...formData, height: "", broadth: "", width: "", amount: "", weight: "0"},
    setVolumetricWeight(""))
  }
  
const reducer = (state, action) => {
  
  if(action.type === "land") return {volumetricWeight: landCalculator(formData.height, formData.broadth, formData.width, formData.amount) }
  if(action.type === "sea") return {volumetricWeight: seaCalculator(formData.height, formData.broadth, formData.width, formData.amount) }
  if(action.type === "air") return {volumetricWeight: airCalculator(formData.height, formData.broadth, formData.width, formData.amount) }
  return state;
}

  const initialState = {transport: null};
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <div className="mainDiv">
      <h1>Amorskis Personal Freight Calculator</h1>
      <h2>Selected method of transport:</h2>
      <section className="buttons">
        <button onClick={() => dispatch({type: "land"})}>🚛Land transport</button>
        <button onClick={() => dispatch({type: "sea"})}>🚢Sea transport</button>
        <button onClick={() => dispatch({type: "air"})}>✈️Air transport</button>
        <button onClick={clearAll}>❌Clear all</button>
      </section>
      <section className="inputs">
        <h3>Input in m/kg</h3>
            <input type = "number" name="height" placeholder="height" value={formData.height} onChange={changeHandler}></input>
            <input type = "number" name="broadth" placeholder="broadth" value={formData.broadth} onChange={changeHandler}></input>
            <input type = "number" name="width" placeholder="width" value={formData.width} onChange={changeHandler}></input>
            <input type = "number" name="amount" placeholder="amount" value={formData.amount} onChange={changeHandler}></input>
            <input type = "number" name="weight" placeholder="weight" value={formData.weight} onChange={changeHandler}></input>
            <p>Volumetric weight: {volumetricWeight} KG</p>
        </section>
        <section className="comparisson">
            <p>Volumetric Weight: {volumetricWeight} KG Bruttoweight:{formData.weight} KG</p>
            <h3>{volumetricWeight < formData.weight * formData.amount ? "You will be charged for the Bruttoweight" : "You will be charged for the Volumetric Weight"}</h3>
        </section>
    </div>
  )

}

export default App;
