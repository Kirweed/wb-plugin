import { setPluginBoardData } from "@whiteboards-io/plugins";
import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { Game } from "./TicTacToe";
import useUpdateGame from "./useUpdateGame";

interface TicTacToeBoardProps {
    gameId: string;
    setBoardData: Dispatch<SetStateAction<Game[]>>;
}

const TicTacToeBoard = ({gameId, setBoardData}: TicTacToeBoardProps) => {
    const dropGame = () => {
        setPluginBoardData([]);
        setBoardData([]);
    }
    //const [game, useGame] = useUpdateGame(gameId);
    const cellArr = new Array(9).fill(<Cell />);

    // useEffect(() => {
    //     console.log(game);
    // },[game])
    return(
        <div><h2>In game</h2><div>
            <Grid>
                {cellArr.map(item => <Cell />)}
            </Grid>
        </div><button onClick={() => dropGame()}>Give up</button></div>
    )
};

const Grid = styled.div`
width: 110px;
display: flex;
flex-wrap: wrap;
gap: 5px;
`;

const Cell = styled.div`
    border: 1px solid black;
    width: 30px;
    height: 30px;
    gap: 5px;
`;

export default TicTacToeBoard;