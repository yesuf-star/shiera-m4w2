import { useState } from "react";

interface BMIEntry{
  height:number;
  weight:number;
  id:number;
  bmi:number
}

function BmiCalculatorApp(){

  const [height, setHeight]=useState("")
  const [weight,setWeight]=useState("")
  const [entries,setEntries]=useState<BMIEntry[]>([])
  const [error, setError]=useState("")

  const heightInMeter=Number(height)/100;
  const bmi=height&& weight&&heightInMeter > 0 ? Number(weight)/(heightInMeter*heightInMeter):0;

  const handleSave= ()=>{ 
    if( height ===""|| weight===""){
    setError("Fill the height and weight to see BMI")
  return;
    }
if(Number(height)<=0 || Number(weight)<=0){
  setError("height and weight must be greater than zero!");
  return;
}
setError("")
const newEntry:BMIEntry={
  id:Date.now(),
  height:Number(height),
  weight:Number(weight),
  bmi:Number(bmi.toFixed(2))
}
setEntries([...entries,newEntry])
setHeight("")
setWeight("")

}

const handleDelete=(id:number)=>{
 setEntries(entries.filter((entry)=>entry.id!==id))}

return(
 <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
        
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          BMI Calculator
        </h1>

        <div className="flex flex-col gap-4">

          <label className="flex flex-col gap-2 font-medium text-gray-700">
            Height (cm)

            <input
              type="number"
              value={height}
              placeholder="Enter height"
              onChange={(event) => {setHeight(event.target.value) 
                setError("")
               }}
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col gap-2 font-medium text-gray-700">
            Weight (kg)

            <input
              type="number"
              value={weight}
              placeholder="Enter weight"
              onChange={(event) =>{
                setWeight(event.target.value)
                setError("")
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="rounded-lg bg-gray-100 p-4 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              BMI: {bmi > 0 ? bmi.toFixed(2) : "--"}
            </h2>
          </div>

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Save Entry
          </button>
        </div>

        <h2 className="mt-8 mb-4 text-xl font-bold text-gray-800">
          Saved Entries
        </h2>

        {entries.length === 0 ? (
          <p className="text-gray-500">
            No saved entries yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
              >
                <span className="text-gray-700">
                  Height: {entry.height} cm | Weight:{" "}
                  {entry.weight} kg | BMI: {entry.bmi}
                </span>

                <button
                  onClick={() => handleDelete(entry.id)}
                  className="ml-4 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>


)

}

export default BmiCalculatorApp;