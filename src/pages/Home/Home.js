import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Watch trending videos for you | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    );
};

export default Home;
