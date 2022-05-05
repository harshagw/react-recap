import React, { useState, useCallback, useEffect }   from 'react';
import { useGlobalContext } from "../context";

const Key = ({val, style}) => {

    const { gameOver, lettersColor, deleteLetter, addLetter, checkRow } = useGlobalContext();

    const [status, setStatus] = useState("normal");

    useEffect(()=>{
        // console.log("running")
        if(lettersColor.disabled.includes(val.toLowerCase())){
            setStatus('disabled');
        }else if(lettersColor.green.includes(val.toLowerCase())){
            setStatus('green');
        }else if(lettersColor.yellow.includes(val.toLowerCase())){
            setStatus('yellow');
        }

    }, [lettersColor]);

    const handleClick = () => {
        if (gameOver.gameOver) return;
        if (val === "ENTER") {
            checkRow();
        } else if (val === "DELETE") {
            deleteLetter();
        } else {
            addLetter(val);
        }
    }

    return (
        <div className="key" id={status} style={style} onClick={handleClick}>
          {val}
        </div>
    );
}

const Keyboard = () => {
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const { currAttempt, gameOver, deleteLetter, addLetter, checkRow } = useGlobalContext();

    const handleKeyboard = useCallback((event) => {
          if (gameOver.gameOver) return;
          if (event.key === "Enter") {
            checkRow();
          } else if (event.key === "Backspace") {
            deleteLetter();
          } else {
            keys1.forEach((key) => {
              if (event.key.toLowerCase() === key.toLowerCase()) {
                addLetter(key);
              }
            });
            keys2.forEach((key) => {
              if (event.key.toLowerCase() === key.toLowerCase()) {
                addLetter(key);
              }
            });
            keys3.forEach((key) => {
              if (event.key.toLowerCase() === key.toLowerCase()) {
                addLetter(key);
              }
            });
          }
        },[currAttempt]);


    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
    
        return () => {
          document.removeEventListener("keydown", handleKeyboard);
        };

      }, [handleKeyboard]);

    return (
        <div className="keyboard">
          <div className="row">
            {keys1.map((key) => {
              return <Key val={key} />;
            })}
          </div>
          <div className="row">
            {keys2.map((key) => {
              return <Key val={key}/>;
            })}
          </div>
          <div className="row">
            <Key val={"ENTER"} increaseWidth  style={{width:"100px"}}/>
            {keys3.map((key) => {
              return <Key val={key} />;
            })}
            <Key val={"DELETE"} increaseWidth  style={{width:"100px"}}/>
          </div>
        </div>
      );
}

export default Keyboard