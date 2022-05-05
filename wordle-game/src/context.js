import React, { createContext , useState, useContext, useEffect} from "react";
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    
    const [board, setBoard] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]);

    const [wordsSet, setWordsSet] = useState(new Set(['right','rrigh','rirgh','table','great', 'ggggg'])); // list of all the valid words

    const [currAttempt, setCurrAttempt] = useState({ row: 0, tile: 0 }); // to check row (0,1,2,3,4) and column (0,1,2,3,4) on board
    
    const [correctWord, setCorrectWord] = useState("rrigh");

    const [lettersColor, setLettersColor] = useState({
        disabled: [],
        green: [],
        yellow: []
    });

    const [gameOver, setGameOver] = useState({
        over: false,
        win: false,
    });

    useEffect(()=>{

        // const loadWord = async () => {
        //     try{
        //         const options = {
        //             method: 'GET',
        //             url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        //             params: {count: '5', wordLength: '5'},
        //             headers: {
        //                 'x-rapidapi-host': 'random-words5.p.rapidapi.com',
        //                 'x-rapidapi-key': "93726b2339mshbac1a2529db7422p1bc8e0jsn14ab932e07da"
        //             }
        //         }
        //         const response = await axios.request(options);
                
        //         setCorrectWord(response.data[0])
        //         setLoading(false);

        //         console.log(response.data[0])
                
        //     }catch(error){
        //         console.error(error);
        //     }
            
        // };

        setCorrectWord("right");
        setLoading(false);

    }, []);

    const checkWord = async (word) => {
        return wordsSet.has(word.toLowerCase())
    };

    const checkRow = async () => {
        if (currAttempt.tile !== 5) return;
    
        let currWord = "";

        for (let i = 0; i < 5; i++) {
            let l = board[currAttempt.row][i].toLowerCase();
            currWord += l;
        }

        console.log(lettersColor)

        if (await checkWord(currWord)) {
            
            let already = []
            let checkWord = [...correctWord.toLowerCase()];
            let j;

            for (let i = 0; i < 5; i++) {
                let l = board[currAttempt.row][i].toLowerCase();
                
                if(checkWord[i] == l){
                    setLettersColor((prev) => ({...prev, green:[...(prev.green), l]}));
                    // checkWord[i] = '';
                }else if (!already.includes(l)) {

                    if(checkWord.includes(l)){
                        setLettersColor((prev) => ({...prev, yellow:[...(prev.yellow), l]}));
                        j = checkWord.findIndex((w) => w == l);
                    }else{
                        setLettersColor((prev) => ({...prev, disabled:[...(prev.disabled), l]}));
                    }
                    
                }

                already.push(l);
    
            }

            setCurrAttempt((prevAttempt) => ({ row: prevAttempt.row + 1, tile: 0}));
            
        } else {
          alert("Word not found");
        }

        if (currWord.toUpperCase() === correctWord.toUpperCase()) {
          setGameOver({ over: true, win: true });
          return;
        }
        
        if (currAttempt.row === 4) {
          setGameOver({ over: true, win: false });
          return;
        }
    };

    const deleteLetter = () => {
        if (currAttempt.tile === 0) return;
        setBoard((prevb) => {
            const newb = [...prevb];
            newb[currAttempt.row][currAttempt.tile - 1] = "";

            return newb;
        });
        setCurrAttempt((prevAttempt) => {
            return { ...prevAttempt, tile: prevAttempt.tile - 1 }
        });
    };

    const addLetter = (key) => {
        // console.log(key)
        // console.log(currAttempt)

        if (currAttempt.tile > 4) return;     
        setBoard((prevb) => {
            const newb = [...prevb];
            newb[currAttempt.row][currAttempt.tile] = key;

            return newb;
        });
       setCurrAttempt((prevAttempt) => {
              return { ...prevAttempt, tile: prevAttempt.tile + 1 }
        });
    };
    
    return (
      <AppContext.Provider
        value={{
            loading,
            board,
            currAttempt,
            correctWord,
            lettersColor,
            gameOver,
            addLetter,
            deleteLetter,
            checkRow,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };


export const useGlobalContext = () => {
    return useContext(AppContext);
};
  
export { AppProvider };