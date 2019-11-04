import * as React from 'react'

const Loader: React.SFC = () => {
    return (
        <div className="loading-container">
            <img src='../../../assets/gifs/preloading.gif' 
                    width={200}
                    height={200}/>
        </div>
    )
}

export default Loader;