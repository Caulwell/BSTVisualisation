import {ListItem, ListItemIcon, ListItemText, Popper, Paper, Button, TextField, Slider, Typography, Divider, Input} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NatureIcon from '@mui/icons-material/Nature';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from "react";

export default function Control({type, props}){

    const [anchorEl, setAnchorEl] = useState(null);

    let popperTrue = false;

    const getContent = () => {

        switch(type){
            case "Tree Type":
                popperTrue = true;
                return ( 
                    <NatureIcon fontSize="large"/>
                )
            case "New Node":
                popperTrue = true;
                return (
                <AddCircleOutlineIcon fontSize="large"/>
                )
            case "Search":
                popperTrue = true;
                return (
                    <SearchIcon fontSize="large"/> 
                )
            case "In Order":
                return (
                    <NordicWalkingIcon fontSize="large"/>
                )
            case "Pre Order":
                return (
                    <NordicWalkingIcon fontSize="large"/> 
                )
            case "Post Order":
                return (
                    <NordicWalkingIcon fontSize="large"/>
 
                )
            case "Animation Speed":
                popperTrue = true;
                return (
                    <SpeedIcon fontSize="large"/>
                )
            case "Login/Register":
                return (
                    <AccountCircleIcon fontSize="large"/>
                )
            case "Save Tree":
                popperTrue = true;
                return (
                    <SaveAltIcon fontSize="large"/>
                )
            case "Upload CSV":
                popperTrue = true;
                return (
                    <UploadFileIcon fontSize="large"/>
                )
        }
    };

    const handleClick = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        if(type === "In Order" || type === "Pre Order" || type === "Post Order"){
            console.log(e.currentTarget.getAttribute("name"));
            props.handleButtonPress(e);
        }
    }

    const getPopperContent = () => {
        switch(type){
            case "Tree Type":
                return ( 
                    <>
                        <Button color="inherit" component={Link} to={"/bst"}>BST</Button>
                        <Button color="inherit" component={Link} to={"/avl"}>AVL</Button>
                        <Button color="inherit" component={Link} to={"/red-black"}>Red-Black</Button>
                    </>
                )
            case "New Node":
                return (
                    <>
                    <TextField className="popper-menu-item-input" size="small" type="number" label="New node" autoComplete="off" value={props.addInput} variant="filled" name="addInput" onChange={e => props.setAddInput(e.target.value)} inputProps={{maxLength: 4, }}  onKeyPress={props.handleKeypress}/>
                    <Button className="popper-menu-item-button" variant="contained" name="addButton" onClick={props.handleButtonPress}>Add</Button>
                    </>
                )
            case "Search":
                return (
                    <>
                    <TextField className="popper-menu-item-input" size="small" type="number" label="Search" autoComplete="off"  value={props.searchInput} variant="filled" name="searchInput" onChange={e => props.setSearchInput(e.target.value)} inputProps={{maxLength: 4, }} onKeyPress={props.handleKeypress}/>
                    <Button className="popper-menu-item-button" variant="contained" name="searchButton" onClick={props.handleButtonPress}>Search</Button>
                    </>
                )

            case "Animation Speed":
                return (
                    <>
                    <Typography>Choose speed:</Typography>
                    <Slider onChange={props.handleSpeedChange} onChangeCommitted={props.handleAnimationSpeed} min={0.1} max={1} step={0.1} value={props.speedInput} valueLabelDisplay="auto" marks/>
                    </>
                )
            case "Save Tree":
                return (
                    <>
                    <TextField className="popper-menu-item-input" size="small" type="text" label="TreeName" autoComplete="off" variant="filled" name="treeNameInput"/>
                    <Button onClick={props.handleButtonPress} variant="contained" name="saveButton">Save</Button>
                    </>
                )
            case "Upload CSV":
                return(
                    <>
                    <label htmlFor="contained-button-file">
                        <Input style={{display: "none"}} accept="*.csv" id="contained-button-file" type="file" onChange={props.handleFileInput}/>
                        <Button variant="contained" component="span">
                        Upload
                        </Button>
                    </label>
                    <Button variant="contained"  onClick={props.handleButtonPress} name="generateButton">
                        Generate
                    </Button>
                    </>
                )
                    
        }
    }

    
    const open = Boolean(anchorEl);
    const id = open ? type : undefined;




    return (
        <>
        {type === "Login/Register" && <Divider/>}
        <ListItem button aria-describedby={id} name={type} onClick={handleClick}>
            <ListItemIcon>
                {getContent()}
            </ListItemIcon>
            <ListItemText primary={type}/>
        </ListItem>
        
        {popperTrue && 
                <Popper id={id} open={open} anchorEl={anchorEl} placement="right">
                    <Paper>
                        {getPopperContent()}
                    </Paper>
            </Popper>
            }
        
        </>

        
    )
}