import { setPluginBoardData, watchPluginBoardData } from "@whiteboards-io/plugins";
import { useEffect, useState } from "react";
import { Game } from "./TicTacToe";

const useUpdateGame = (id: string) => {
    const [game, setGame] = useState<Game>();
    const [boardData, setBoardData] = useState<Game[]>([]);

    const setData = async () => {
        await setPluginBoardData([...boardData.filter(item => item.id !== id) || [], game])
    }

    useEffect(() => {
        watchPluginBoardData((data: Game[]) => {
            setBoardData(data);
            const [currentGame] = data.filter(item => item.id === id);
            setGame(currentGame);
        })
    }, [watchPluginBoardData]);

    useEffect(() => {
        setData();
    },[game]);

    return [game, setGame];
}

export default useUpdateGame;