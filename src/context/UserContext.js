import React,{ useState } from "react";


const UserContext = React.createContext({
    trees: [],
    currentTree: null,
    animationSpeed: 0.5
});

let initialState = {};

const UserProvider = props => {
    const [state, setState] = useState(initialState);

    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }