import React from 'react';
import Header from '../Shades/Header/Header';

const HeaderLayout = ({children}) => {
    return (
        <main>
            <Header />
            {
                children
            }
        </main>
    );
};

export default HeaderLayout;