import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateDetailPage, updateHomePage } from "./Redux/Redux"
import axios from "axios"
import { Box, Container, Typography } from "@mui/material"
import "./Style.scss"
import { BsFillPlayFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from "react-router"
import { Nav } from "./Nav"


export const  Home=()=>{
    const state=useSelector(
        ({data})=>data
    )

    const dispatch=useDispatch()
    const [arr,setArr]=useState([])
    const[search,setSearch]=useState([])

    //getting array from api
    useEffect(()=>{
        axios.get("https://api.tvmaze.com/shows/1/episodes")
        .then(function (response){
            setArr(response.data)
            dispatch(updateHomePage(response.data))
        })
    },[]) 

    const pageRender=useNavigate()
    const Details=(id)=>{
        axios.get(`https://api.tvmaze.com/episodes/${id}`)
        .then(function (response){
            dispatch(updateDetailPage([response.data])) 
        })


        pageRender(`/details`)
    }

    return(
        <>  
            <Nav/>

            <Box sx={{backgroundColor:"whitesmoke",paddingTop:"80px"}}>
                <Container>
                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}} columnGap={"20px"} rowGap={"20px"}>
                        {
                            state.arrayHomePage.map((val,ind)=>{
                                return(
                                    <Box className="hvrCard" sx={{width:{xs:"100%",sm:"48%",md:"30%"},borderRadius:"12px",overflow:"hidden",boxShadow:"0px 0px 5px #d3cdcd"}}>
                                        <Box>
                                            <Box sx={{position:"relative"}}>
                                                <Typography 
                                                    component="img"
                                                    src={val.image.original}
                                                sx={{width:"100%",height:"250px"}}/>
                                                <Box sx={{cursor:"pointer",position:"absolute",bottom:"-15px",right:"40px",fontSize:"25px",color:"white",backgroundColor:"red",height:"40px",width:"40px",borderRadius:"50%",display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                                                    <BsFillPlayFill onClick={()=>Details(val.id)}/>
                                                </Box>
                                            </Box>
                                        
                                            <Box sx={{padding:"10px"}}>
                                                <Typography
                                                component="h1"
                                                sx={{fontSize:"18px"}}>
                                                {val.name}
                                                </Typography>

                                                <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                                    <Box sx={{width:"50%"}}>
                                                        <Typography
                                                        component="p"
                                                        sx={{fontSize:"14px"}}>
                                                            <span style={{color:"orange",paddingRight:"5px"}}><AiFillStar/></span>
                                                            
                                                            {val.rating.average}<span> / 10</span>
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{width:"50%"}}>
                                                        <Typography
                                                        component="p"
                                                        sx={{fontSize:"14px",textTransform:"capitalize"}}>                                                           
                                                            {val.type}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Box sx={{height:"150px",paddingTop:"10px"}}>
                                                    <Typography
                                                        component="p"
                                                        sx={{fontSize:"12px",textTransform:"capitalize"}}>   
                                                        {val.summary.replace(/<\/?p>/g, "")}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Container>
            </Box>
        </>
    )
}