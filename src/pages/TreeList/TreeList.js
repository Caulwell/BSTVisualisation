import {useEffect, useState, useContext} from "react";
import { UserContext } from "../../context/UserContext";
import {Box, Grid, Typography, Card, CardContent,Button} from "@mui/material";
import {fromJSON} from "flatted";
import { useHistory } from "react-router-dom";

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

                    console.log(data);
                    let treeArray = [];

                    data.trees.forEach(tree => {
                        let treeObject = fromJSON(tree.tree);
                        treeObject._id = tree._id;
                        treeArray.push(treeObject);
                    });

                    console.log(treeArray);
                    setTrees(treeArray);

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
                    loadTrees();
                } else {
                    console.log(response);
                }
            });
    };

    const handleClick = (e, id) => {
        if (e.target.name === "treeButton") {

            let selectedTree = null;

            trees.forEach(tree => {
                if(tree._id === id){
                    selectedTree = tree;
                }
            });

            if(selectedTree.type === "bst"){
                setUserContext(oldValues => {
                  return {...oldValues, currentBST: selectedTree, currentBSTMessages: []};
                });
                history.push("/bst");
              } else if(selectedTree.type === "avl"){
                setUserContext(oldValues => {
                  return {...oldValues, currentAVL: selectedTree, currentAVLMessages: []};
                });
                history.push("/avl");
              } else {
                setUserContext(oldValues => {
                  return {...oldValues, currentRB: selectedTree, currentRBMessages: []};
                });
                history.push("/red-black");
              }

        } else if (e.target.name === "deleteButton") {
            deleteTree(id);
        }
    };


    const Tree = ({tree}) => (
    <Grid item xs={6}>
        <Card sx={{ minWidth: 275 }}>
        
      <CardContent>
      
        <Typography variant="h5" component="div">
        
          {tree.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Type: {tree.type}
        </Typography>
        <Button name="treeButton" size="small" onClick={(e) => handleClick(e, tree._id)}>Go to tree</Button>
        <Button name="deleteButton" size="small" color="error" variant="outlined" onClick={(e) => handleClick(e, tree._id)}>Delete tree</Button>
      </CardContent>
      
    </Card>
    </Grid>
    )


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            {trees.map((tree, index) => {
                return (
                    <Tree tree={tree} key={tree._id}>
                    </Tree>
            )})}
            </Grid>
      </Box>
    )
}