import { Box, Container, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux" 
import { AiFillStar } from 'react-icons/ai';
import { NavDetails } from "./NavDetails";
import "./Style.scss"

export const  Details=()=>{
    const state=useSelector(
        ({data})=>data
    )

    return(
        <>
            <NavDetails/>

            <Box sx={{backgroundColor:"whitesmoke"}}>
                <Container>
                    {state.arrayDetailPage.map((val,ind)=>{
                        return(
                            <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",height:"100vh",padding:{xs:"100px 0px",sm:"0px"}}}>
                            <Box sx={{boxShadow:"0px 0px 5px red",borderRadius:"22px",width:"100%",display:"flex",flexWrap:"wrap",overflow:"hidden"}}>
                                <Box sx={{width:{xs:"100%",sm:"60%"},display:"flex",flexWrap:"wrap",backgroundColor:"white"}}>
                                    <Box sx={{width:{xs:"100%",sm:"50%"},padding:"15px",textAlign:"center"}}>
                                            <Typography
                                                component="img"
                                                src={val.image.medium}
                                                sx={{width:"90%",height:"250px",boxShadow:"0px 0px 5px red",borderRadius:"12px"}}>
                                            </Typography>
                                    </Box>
                                    <Box sx={{width:{xs:"100%",sm:"40%"},padding:{xs:"10px 0px 10px 20px",sm:"10px 0px"}}}>
                                        <Typography
                                            component="h1"
                                            variant="h5"
                                            sx={{color:"red",textAlign:"center",textDecoration:"underline"}}>
                                                {val.name}
                                        </Typography>

                                        <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                            <Typography
                                                component="h3"
                                                sx={{color:"black",width:"50%"}}>
                                                    Rating
                                            </Typography>

                                            <Typography
                                                component="h6"
                                                sx={{color:"black",width:"50%",textAlign:"center"}}>
                                                    <span style={{color:"orange",paddingRight:"5px"}}><AiFillStar/></span>

                                                    {val.rating.average}<span> / 10</span>
                                            </Typography>
                                        </Box>

                                        <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                            <Typography
                                                component="h3"
                                                sx={{color:"black",width:"50%"}}>
                                                    Release Date
                                            </Typography>

                                            <Typography
                                                component="h6"
                                                sx={{color:"black",width:"50%",textAlign:"center"}}>
                                                    {val.airdate}
                                            </Typography>
                                        </Box>

                                        <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                            <Typography
                                                component="h3"
                                                sx={{color:"black",width:"50%"}}>
                                                    Season
                                            </Typography>

                                            <Typography
                                                component="h6"
                                                sx={{color:"black",width:"50%",textAlign:"center"}}>
                                                    {val.season}
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                            <Typography
                                                component="h3"
                                                sx={{color:"black",width:"50%"}}>
                                                    Episode
                                            </Typography>

                                            <Typography
                                                component="h6"
                                                sx={{color:"black",width:"50%",textAlign:"center"}}>
                                                    {val.number}
                                            </Typography>
                                        </Box>

                                        <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                            <Typography
                                                component="h3"
                                                sx={{color:"black",width:"50%"}}>
                                                    Type
                                            </Typography>

                                            <Typography
                                                component="h6"
                                                sx={{color:"black",width:"50%",textAlign:"center"}}>
                                                    {val.type}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{width:"100%"}}>
                                            <Typography
                                                component="p"
                                                sx={{color:"black",padding:"20px",fontSize:"14px"}}>
                                                    {val.summary.replace(/<\/?p>/g, "")}
                                            </Typography>
                                        </Box>
                                </Box>
                                
                                <Box sx={{width:{xs:"100%",sm:"40%"},display:"flex"}} className="pickgradient">
                                    <Typography
                                        component="img"
                                        src={val.image.original}
                                        sx={{width:"100%"}}>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        )
                    })}
                </Container>
            </Box>
        </>
    )
}