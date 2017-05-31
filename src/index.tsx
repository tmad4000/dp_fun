import * as React from "react";
import * as ReactDOM from "react-dom";

import { Knapsack } from "./components/Knapsack";
// import { ListView } from "./components/ListView";
// import { Store } from "./components/Store";
// import { ListViewSlow1 } from "./components/ListViewSlow1";
// import { ListViewUncontrolled } from "./components/ListViewUncontrolled";

ReactDOM.render(
    <Knapsack />,

    //<ListViewUncontrolled />,
    // <ListViewSlow1 />,

    document.getElementById("app-container")
);