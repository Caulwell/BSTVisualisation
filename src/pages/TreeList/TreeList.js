import {useEffect, useState, useContext} from "react";
import { UserContext } from "../../context/UserContext";
import {Box, Grid, Typography, Card, CardContent, CardActions, Button} from "@mui/material";
import {fromJSON} from "flatted";
import { useHistory } from "react-router-dom";
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

export default function TreeList(){

    const [userContext, setUserContext] = useContext(UserContext);
    const [trees, setTrees] = useState([]);
    const history = useHistory();

    const loadTrees = () => {
        fetch("http://localhost:4000/getTrees", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userContext.token}`,
                },
            })
            .then(async response => {
                if (response.ok) {
                    let data = await response.json();

                    data.trees.forEach((element, index) => {
                        data.trees[index] = fromJSON(element.tree);
                        data.trees[index].push(element._id);
                    });

                    setTrees(data.trees);

                } else {
                    console.log(response);
                }
            });
    }

    useEffect(() => {
        loadTrees();
    }, []);

    const deleteTree = (id) => {

        fetch("http://localhost:4000/deleteTree", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userContext.token}`,
                },
                body: JSON.stringify({
                    id
                })
            })
            .then(async response => {
                if (response.ok) {
                    let data = await response.json();
                    console.log(data);
                    loadTrees();
                } else {
                    console.log(response);
                }
            })

    }

    const handleClick = (e, id) => {
        if (e.target.name === "treeButton") {

        } else if (e.target.name === "deleteButton") {
            console.log(id);
            deleteTree(id);
        }
    }


    const Tree = ({tree}) => (
    <Grid item xs={6}>
        <Card sx={{ minWidth: 275 }}>
        
      <CardContent>
      
        <Typography variant="h5" component="div">
        
          Tree {tree.at(-1)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Number of nodes: {tree.length}
        </Typography>
        <Button name="treeButton" size="small" onClick={(e) => handleClick(e, tree.at(-1))}>Go to tree</Button>
        <Button name="deleteButton" size="small" color="error" variant="outlined" onClick={(e) => handleClick(e, tree.at(-1))}>Delete tree</Button>
      </CardContent>
      
    </Card>
    </Grid>
    )


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            {trees.map((tree, index) => {
                return (
                    <Tree tree={tree}>
                    </Tree>
            )})}
            </Grid>
      </Box>
    )
}