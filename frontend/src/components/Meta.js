import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({title, description, keywords }) => {

    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to MedShop | Home',
    description: 'We sell best products at best price',
    keywords:'medicines, buy medicines, cheap medicines'
}

export default Meta;

