import React, { useEffect, useState } from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetailPage, updateSearch } from './Redux/Redux';
import "./Style.scss"
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';



export const Nav=()=>{
    const state=useSelector(
        ({data})=>data
    )

    const [modalbox,setModalbox]=useState(false) 
    const[searchArray,setSearchArray]=useState([])
    const[searchObject,setSearchobject]=useState({}) 
    const[invalidInput,setInvalidinput]=useState(false)
    const[searchFound,setSearchFound]=useState(false)
    const dispatch=useDispatch()

    const searchInput=(e)=>{
        var search=e.target.value
        if(search.length>0){ 
            if(search %1 !== 0){
                setInvalidinput(false)
                setSearchFound(true)

                fetch(`https://api.tvmaze.com/singlesearch/shows?q=${search}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if(data !== null){
                        setSearchArray([data])
                        setSearchobject(data)
                        console.log(data)
                    }
                    else{
                        setInvalidinput(true)
                        setSearchFound(false)
                    }
                })
            }
            else{
                setInvalidinput(true)
                setSearchFound(false)
            }
        }
        else{
            setSearchArray([])
        }
    }

      useEffect(()=>{ 
        if(searchArray.length>0){
            if(invalidInput===false){
                setModalbox(true) 
                dispatch(updateSearch(searchObject))
            }
        }
        else{
            setModalbox(false)
        }
      },[searchArray])


    const pageRender=useNavigate()
    const Details=(id)=>{
        axios.get(`https://api.tvmaze.com/episodes/${id}`)
        .then(function (response){
            dispatch(updateDetailPage([response.data]))  
        })

        pageRender(`/details`)
    }

    const DetailsSearch=()=>{
        dispatch(updateDetailPage([searchObject]))  
        pageRender(`/details`)
    }

    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{top:"0px",backgroundColor:"whitesmoke",padding:"10px 0px"}}>
                    <Container>
                        <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center"}}> 
                            <Box sx={{width:{xs:"20%",md:"40%"}}}>
                                <Typography
                                    variant="p"
                                    noWrap
                                    component="div"
                                    sx={{ cursor:"pointer",color:"red",fontSize:"18px" }}
                                >
                                    Home
                                </Typography>
                            </Box>

                            <Box sx={{width:{xs:"80%",md:"40%"}}}>
                                <form class="searchForm">
                                    <input type="text" placeholder='Search by movie name....' onChange={(e)=>searchInput(e)}/>
                                    <Box sx={{position:"absolute",top:"10px",left:"10px",color:"red"}}>
                                        <BiSearch/>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Container>
                </AppBar>
            </Box>

            {
                modalbox ?   
                        <Box sx={{position:"fixed",top:"55px",minHeight:"400px",width:"100%",backgroundColor:"#fff4f4eb",zIndex:9990,padding:"20px 0px"}}>
                            {
                                invalidInput  ? 
                                    <Container>
                                        <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",minHeight:"400px"}}>
                                            <Box sx={{width:"50%",display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",minHeight:"200px",border:"1px solid red",borderRadius:"12px",color:"red"}}>
                                                Invalid Input
                                            </Box>  
                                        </Box>
                                    </Container>
                                    : 
                                    <Box>
                                        {
                                            searchFound ?
                                                    <Container> 
                                                        <Box className="hvrCard" sx={{width:{xs:"100%",sm:"48%",md:"30%"},borderRadius:"12px",overflow:"hidden",boxShadow:"0px 0px 5px #d3cdcd"}}>
                                                            <Box>
                                                                <Box sx={{position:"relative"}}>
                                                                    <Typography 
                                                                        component="img"
                                                                        src={state.arraySearch.image===null || state.arraySearch.image.length<0? 
                                                                                ""
                                                                            :
                                                                                state.arraySearch.image.original===null ? 
                                                                                
                                                                                ""
                                                                            :
                                                                                state.arraySearch.image.original   
                                                                        }


                                                                    sx={{width:"100%",height:"250px"}}/>
                                                                    <Box sx={{cursor:"pointer",position:"absolute",bottom:"-15px",right:"40px",fontSize:"25px",color:"white",backgroundColor:"red",height:"40px",width:"40px",borderRadius:"50%",display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                                                                        <BsFillPlayFill onClick={()=>DetailsSearch()}/>
                                                                    </Box>
                                                                </Box>
                                                            
                                                                <Box sx={{padding:"10px"}}>
                                                                    <Typography
                                                                    component="h1"
                                                                    sx={{fontSize:"18px"}}>
                                                                    {state.arraySearch.name}
                                                                    </Typography>

                                                                    <Box sx={{display:"flex",flexWrap:"wrap",padding:"10px 0px"}}>
                                                                        <Box sx={{width:"50%"}}>
                                                                            <Typography
                                                                            component="p"
                                                                            sx={{fontSize:"14px"}}>
                                                                                <span style={{color:"orange",paddingRight:"5px"}}><AiFillStar/></span>
                                                                                
                                                                                {state.arraySearch.rating.average%1===0 ? state.arraySearch.rating.average : "5"}<span> / 10</span>
                                                                            </Typography>
                                                                        </Box>

                                                                        <Box sx={{width:"50%"}}>
                                                                            <Typography
                                                                            component="p"
                                                                            sx={{fontSize:"14px",textTransform:"capitalize"}}>                                                           
                                                                                {state.arraySearch.type}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>
                                                                    
                                                                    <Box sx={{height:"150px",paddingTop:"10px"}}>

                                                                        {state.arraySearch.summary!==null ? state.arraySearch.summary.replace(/(<([^>]+)>)/ig, "") :""}
                                                                        
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Container>
                                                :
                                                    ""
                                        }
                                    </Box>
                            }
                        </Box> 
                        :
                            ""
            }
        </>
    )
}