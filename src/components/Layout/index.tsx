import React from "react";
import Header from "../Header";

type Props = {
    children: any;
}

const Layout = ({ children }:Props) => {
    return (
        <React.Fragment>
            <Header />
            <main>
                {children}
            </main>
        </React.Fragment>
    );
}

export default Layout;