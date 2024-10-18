"use client"

import { Box, Paper } from "@mui/material"

interface gamePageType {
    pageName: string;
    pagePath: string;
}
const GamePage = ():JSX.Element => {

    const gameList:gamePageType[] = [
        {
            pageName: 'もぐらたたきゲーム',
            pagePath: '/games/mogura'
        },
    ]

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            {gameList.map((game:gamePageType) => {
                return (
                    <Paper
                        sx={{
                            marginBottom: "15px",
                            textAlign: "center",
                            width: "300px",
                            cursor: "pointer",
                            fontSize: "30px",
                            fontWeight: "bold",
                            padding: "20px",
                            color: "#555555"
                        }}
                        onClick={() => {
                            window.location.href = game.pagePath;
                        }}
                    >
                        {game.pageName}
                    </Paper>
                )
            })}
        </Box>
    )
}

export default GamePage;
