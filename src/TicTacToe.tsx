import { getBoardUsers, getCurrentBoardUser, getPluginBoardData, setPluginBoardData, UserData, watchPluginBoardData } from "@whiteboards-io/plugins";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import TicTacToeBoard from "./TicTacToeBoard";

export interface Game {
    id: string;
    users: UserData[];
}

const TicTacToe = () => {
    const [boardUsers, setBoardUsers] = useState<UserData[]>([]);
    const [user, setUser] = useState<UserData>();
    const [boardData, setBoardData] = useState<Game[]>([]);
    const [currentGameId, setCurrentGameId] = useState("");

    const isPlayerInGame = (player: UserData) => {
        for (const {users} of boardData) {
            if(users.length === 0) return false;
            for (const participant of users) {
                if(participant.id === player.id) return true;
            }
        }

        return false;
    } 

    const startGame = (player: UserData) => {
        if (!user || isPlayerInGame(player) || isPlayerInGame(user)) return;
        const gameId = uuidv4();
        setCurrentGameId(gameId);
        setPluginBoardData([...boardData, {gameId, users: [player, user]}]);
    }

    const init = async () => {
        setPluginBoardData([]);
        const usersArr = await getBoardUsers();
        const currentUser = await getCurrentBoardUser();
        setUser(currentUser);
        setBoardUsers(usersArr);
    }

    useEffect(() => {
        init();
    },[])

    useEffect(() => {
        watchPluginBoardData((data: Game[]) => setBoardData(data || []));
    }, [watchPluginBoardData])

    return (
    <StyledContainer>
        {user && isPlayerInGame(user) ? <TicTacToeBoard gameId={currentGameId} setBoardData={setBoardData}/> :
            <>
                <h2>Choose an opponent: </h2>
                <Flex>{boardUsers.map(item => <StyledButton key={item.id} onClick={() => startGame(item)}><img src={item.photoURL} /></StyledButton>)}</Flex>
            </>
        }
    </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 20px;
`;

const StyledButton = styled.div`
    border-radius: 50%;
    border: none;
    width: fit-content;

    img {
        border-radius: 50%;
        width: 50px;
    }
`;

const Flex = styled.div`
    display: flex;
    gap: 10px;
`;

export default TicTacToe;