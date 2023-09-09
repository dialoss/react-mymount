import React from 'react';
import loadingGif from 'assets/gifs/loading.gif';
import styles from 'styles/ui/PageLoading.module.scss';

const PageLoading = () => {
    return (
        <div className="page-loading">
            <div className="container">
                <img className={styles.img} src={loadingGif} alt=""/>
            </div>
        </div>
    );
};

export default PageLoading;