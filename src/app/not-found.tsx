import React from 'react';

import RootLayout from './layout';

const NotFound = () => {
    return (
        <RootLayout includeHeaderAndFooter={false} >
            <main>
                <h1>Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
            </main>
        </RootLayout>
    );
};

export default NotFound;