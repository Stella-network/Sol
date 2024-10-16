"use client";

import { basePaperStyle } from "@/styles/baseStyles";
import { Box, Button, Link, Paper, Stack } from "@mui/material";

const tashizanPage = ():JSX.Element => {
    return (
        <Paper
            sx={basePaperStyle}
        >
            <Box
                sx={{
                    width: "auto"
                }}
            >
                <Stack
                    direction={"row"}
                    spacing={2}
                >

                </Stack>
            </Box>
            <Link
                href={`/`}
            >
                {`もどる`}
            </Link>
        </Paper>
    )
}

export default tashizanPage;
