import { UserContext } from "../../context/UserContext";
import { useContext, useState, useEffect } from "react";
import "./AnimationPanel.css";



export default function AnimationPanel(){

    const [speedInput, setSpeedInput] = useState(1);
    const [userContext, setUserContext] = useContext(UserContext);

    useEffect(() => {
        setUserContext(oldValues => {
            return {...oldValues, animationSpeed: 1 - (speedInput)};
        });
    }, []);


    const handleSpeedChange = e => {
        console.log(e.target.value);
        setSpeedInput(e.target.value);
    };

    const handleAnimationSpeed = () => {

        console.log(speedInput);

      let newSpeed = 1 - (speedInput);

          if(newSpeed !== userContext.animationSpeed){
              setUserContext(oldValues => {
                  return {...oldValues, animationSpeed: newSpeed};
              });
          }
    };

    return (

        <div className="animation-panel">
            <div className="speed-change">
            Animation Speed
                <input 
                    type="range"
                    onChange={handleSpeedChange} 
                    onMouseUp={handleAnimationSpeed}
                    min={0.1} 
                    max={1} 
                    step={0.1} 
                    value={speedInput} 
                > 
                </input>
            </div>
           
        </div>

        
    )
}