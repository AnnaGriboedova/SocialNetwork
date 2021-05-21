import loadingImg from "../../../assets/img/icons/loading.svg";
import React from "react";

const Preloader: React.FC = () => {
    return <div>
        <img src={loadingImg}/>
    </div>
};

export default Preloader;