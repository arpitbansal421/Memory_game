import './App.css';
import { useEffect, useState } from 'react';

// 4 x 4 cards

function App() {

  const [stage, setstage]=useState('init')
  const [board,setboard]=useState(Array(16));
  const [opened,setopened]=useState([]);
  const [complete,setcomplete]=useState([]);

  const handledisplay=(index)=>{

    if(opened.length<2 && !complete.includes(index)){

      setopened((prev)=>[...prev,index]);
      console.log(opened);
    }


  }


  const getrandomnum=()=>{
    const numarray=[];
    for(let i=1;i<=8;i++){
      numarray.push(i);
      numarray.push(i);


    }

    numarray.sort(()=>Math.random()-0.5)

    setboard(numarray);

    
  }
  const handleStart=()=>{

    setstage('start');
    getrandomnum();
    setcomplete([]);
  }


  const getclass=(index)=>{
    if(opened.includes(index)){
      

      return 'show';
    } else if (complete.includes(index)){
      return 'remove'
    }
    else{


      return 'hide';
    }

  }

  useEffect(()=>{

    if(opened.length===2){

      
      
      const timer=setTimeout(()=>{
        const idx1=opened[0];
        const idx2=opened[1];
        if(board[idx1]===board[idx2]){

          setcomplete((prev)=>[...prev,idx1,idx2]);


        }

        
        setopened([]);
        
      },1500)

      console.log(opened);

      return ()=>clearTimeout(timer);
    }
    
  },[opened,board])


  useEffect(()=>{

    if(complete.length===board.length){

      setstage('win');
    }
  },[complete,board]);

  


  

  return (
    <div className="App">
      <h1>Memory Game</h1>

      {
        stage==='init' && <button className='btn' onClick={handleStart}>Play Game</button>
      }

      {
        stage==='start' && <div className='game'> 
        
        <div className='cards'>
          {
            board.map((item,index)=>(
              <div className={`card ${getclass(index)}`} key={index} onClick={()=>handledisplay(index)}>
                {item}
              </div>


            ))
          }
          </div>  
        
        
        </div>
      }

      {
        stage==='win' && <div className='won'>
          <h2 style={{color:'red'}}>Congratulation You Won The Game</h2>

          <button onClick={handleStart}>Reset Game</button>
        
        </div>
      }

      </div>

   
  );
}

export default App;