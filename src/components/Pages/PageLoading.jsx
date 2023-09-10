import React from 'react';
import loadingGif from 'assets/gifs/loading.gif';
import 'styles/ui/PageLoading.scss';

const PageLoading = () => {
    return (
        <div className="container">
            <div className="page-loading">
                <img src={loadingGif} alt=""/>
            </div>
        </div>
    );
};

export default PageLoading;