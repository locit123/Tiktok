import React from 'react';
import { Helmet } from 'react-helmet';

const Message = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Messages | TikTok</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            Message
        </div>
    );
};

export default Message;
