import React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import "./Style.scss"
import { useNavigate } from 'react-router';



export const NavDetails=()=>{

    const pageRender=useNavigate()
    const Home=()=>{
        pageRender(`/`)
    }

    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{top:"0px",backgroundColor:"whitesmoke",padding:"20px 0px"}}>
                    <Container>
                        <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}> 
                            <Box sx={{width:{xs:"20%",md:"40%"}}}>
                                <Typography
                                    variant="p"
                                    noWrap
                                    component="div"
                                    onClick={()=>Home()}
                                    sx={{ cursor:"pointer",color:"red",fontSize:"18px" }}
                                >
                                    Home
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </AppBar>
            </Box>
        </>
    )
}