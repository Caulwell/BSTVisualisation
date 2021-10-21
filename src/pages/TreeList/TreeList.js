import {useEffect, useState, useContext} from "react";
import { UserContext } from "../../context/UserContext";
import {Box, Grid, Typography, Card, CardContent, CardActions, Button} from "@mui/material";
import {fromJSON} from "flatted";
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

export default function TreeList(){

    const [userContext, setUserContext] = useContext(UserContext);
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/getTrees", {
                method: "GET",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userContext.token}`,
                },
            })
            .then(async response => {
                if(response.ok){
                    let data = await response.json();

                    data.trees.forEach((element, index) => {
                        data.trees[index] = fromJSON(element.tree);
                    });

                    setTrees(data.trees);

                } else {
                    console.log(response);
                }
            });
    },[]);

    const handleClick = (e) => {

    }


    const Tree = ({tree, index}) => (
        <Card sx={{ minWidth: 275 }}>
        
      <CardContent>
      
        <Typography variant="h5" component="div">
        
          Tree {index+1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Number of nodes: {tree.length}
        </Typography>
        <Button size="small" onClick={handleClick}>Go to tree</Button>
      </CardContent>
      
    </Card>
    )


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            {trees.map((tree, index) => {
                return <Grid item xs={6}>
                    <Tree index={index} tree={tree}></Tree>
            </Grid>
            })}
            </Grid>
      </Box>
    )
}