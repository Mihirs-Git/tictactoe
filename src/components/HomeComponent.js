import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import $ from 'jquery';

function Home(props){

    let [turn, switchTurn] = useState(2);

    let [value, changeValue] = useState('O');

    let [grid, setGrid] = useState([' ',' ',' ',' ',' ',' ',' ',' ',' ']);

    let [gridDisable, setDisable] = useState([false, false, false, false, false, false, false, false, false]);

    let [score_p1, setScoreP1] = useState(0);

    let [score_p2, setScoreP2] = useState(0);

    let [isModalOpen, toggleModal] = useState(false);

    let [winner, setWinner] = useState(0);

    let [count, setCounter] = useState(0);

    let [imgModal, setImage] = useState("");

    let [result, setResult] = useState("");

    const setValue = (index) => {

        
        setCounter(prev => prev + 1);

        setGrid(prevGrid => {

            prevGrid[index] = value;

            return [...prevGrid];
            
        });

        setDisable(prevState => {
            prevState[index] = true;
            return [...prevState];
        });

    }

    const reset = () => {

        setScoreP1(0);
        setScoreP2(0);
        newGame();
    }

    const newGame = () => {

        if($(".gridBox").hasClass("disabled")){
            $(".gridBox").removeClass("disabled");
        }
        switchTurn(2);
        changeValue('O');
        setGrid([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        setDisable([false, false, false, false, false, false, false, false, false]);
        setWinner(0);
        setCounter(0);
        setImage("");
        setResult("");

    }

    const closeModal = () => {

        toggleModal(false);
    }
    
    useEffect(() => {
       
        // CHECK WINNING STATE - BRUTE FORCE
        
            // COLUMN WINNING STATE
        if(grid[0] === grid[3] && grid[3] === grid[6] && grid[0] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {        
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([true, false, false, true, false, false, true, false, false]);
        }
        else if(grid[1] === grid[4] && grid[4] === grid[7] && grid[1] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {        
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([false, true, false , false, true, false, false ,true, false]);
        }
        else if(grid[2] === grid[5] && grid[5] === grid[8] && grid[2] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {        
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([false, false, true, false, false, true, false ,false, true]);
        }

            // ROW WINNING STATE
        else if(grid[0] === grid[1] && grid[1] === grid[2] && grid[0] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {        
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([true, true, true, false, false, false, false, false, false]);
        }
        else if(grid[3] === grid[4] && grid[4] === grid[5] && grid[3] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {        
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([false, false, false, true, true, true, false, false, false]);
        }
        else if(grid[6] === grid[7] && grid[7] === grid[8] && grid[6] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1)
                setWinner(1);          
            }
            else
            {     
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([false, false, false, false, false, false, true,true, true]);
        }

            // DIAGONAL WINNING STATE
        else if(grid[0] === grid[4] && grid[4] === grid[8] && grid[0] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {    
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([true, false, false, false, true, false, false, false, true]);
        }
        else if(grid[2] === grid[4] && grid[4] === grid[6] && grid[2] !== " ")
        {
            if(value === 'O')  
            {  
                setScoreP1(prev => prev + 1);
                setWinner(1);
            }
            else
            {    
                setScoreP2(prev => prev + 1);
                setWinner(2);
            }
            setDisable([false, false, true, false, true, false, true, false, false]);
        }
        else
        {
            if(count === 9)
            {
                setWinner(-1);
            }
            
        }
        
        if(turn === 1)
        {
            switchTurn(2);
            changeValue('X');
        }
        else
        {
            switchTurn(1);
            changeValue('O');
        }
        // eslint-disable-next-line
    }, [grid]);

    useEffect(() => {
        $(".gridBox").addClass("disabled");
        if(winner === 1)
        {
            setResult("Player-1 Wins!!!");
        }
        else if(winner === 2)
        {
            setResult("Player-2 Wins!!!");
        }
        else
        {
            setImage("./drawn.jpg");
            setResult("Oops... Game Draw");
            setDisable([false, false, false, false, false, false, false, false, false]);
        }
        if(winner === 0)
        {
            toggleModal(false);
            $(".gridBox").removeClass("disabled");
        }
        else
        {        
            toggleModal(true);
        }
    }, [winner]);

    return(

        <React.Fragment>

            <div className="container">

                <h1 className="pt-4 pb-4">Tic Tac Toe</h1>

                <div className="row">
                    <div className="col-12">
                        <button onClick={newGame} className="btn btn-success btn-lg fa fa-plus m-5">{' '}New Game</button>
                        <button onClick={reset} className="btn btn-warning btn-lg text-white fa fa-undo m-5">{' '}Reset Scores</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <a type="button" href={() => false} onClick={() => setValue(0)} className={`btn ${gridDisable[0]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mb- 0 gridBox top left`}>{grid[0]}</a>
                        <a type="button" href={() => false} onClick={() => setValue(1)} className={`btn ${gridDisable[1]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mb- 0 gridBox top`}>{grid[1]}</a>
                        <a type="button" href={() => false} onClick={() => setValue(2)} className={`btn ${gridDisable[2]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mb- 0 gridBox top right`}>{grid[2]}</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <a type="button" href={() => false} onClick={() => setValue(3)} className={`btn ${gridDisable[3]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mt-0 mb- 0 gridBox middle left`}>{grid[3]}</a>
                        <a type="button" href={() => false} onClick={() => setValue(4)} className={`btn ${gridDisable[4]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mt-0 mb- 0 gridBox middle`}>{grid[4]}</a>
                        <a type="button" href={() => false} onClick={() => setValue(5)} className={`btn ${gridDisable[5]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mt-0 mb- 0 gridBox middle right`}>{grid[5]}</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <a type="button" href={() => false} onClick={() => setValue(6)} className={`btn ${gridDisable[6]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mt-0 gridBox bottom left`}>{grid[6]}</a>
                        <a type="button" href={() => false} onClick={() => setValue(7)} className={`btn ${gridDisable[7]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mt-0 gridBox bottom`}>{grid[7]}</a>
                        <a type="button" href={() => false} onClick={() => setValue(8)} className={`btn ${gridDisable[8]===false ? 'disabled btn-outline-light' : 'disabled btn-light'} btn-lg p-5 mt-0 gridBox bottom right`}>{grid[8]}</a>
                    </div>
                </div>
                <div className="row p-5 text-center">
                    <div className="col-6 score">
                        <h4> {score_p1} </h4>
                    </div>
                    <div className="col-6 score">
                        <h4> {score_p2} </h4>
                    </div>
                    <div className="col-6 players">
                       <h3> Player 1 - O </h3>
                    </div>
                    <div className="col-6 players">
                        <h3> Player 2 - X </h3>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} toggle={closeModal}>
                <ModalBody className="text-center" toggle={closeModal}>
                    <span className="fa fa-times float-right closeBtn" onClick={closeModal}></span>
                    <img className="ml-5 mr-5" src={imgModal} alt="Winner"></img>
                    <p className="result">{result}</p>
                </ModalBody>
            </Modal>

        </React.Fragment>

    );

}

export default Home;