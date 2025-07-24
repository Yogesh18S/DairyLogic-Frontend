import React from "react";
import { CSpinner } from "@coreui/react";

const AppLoadingSpinner = () =>{

    return (
        <div className="d-flex justify-content-center">
            <CSpinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        </div>
    );
};

export default React.memo(AppLoadingSpinner)