import { Navigate } from 'react-router-dom';


const ProtectedRoute = (props) => {
    if(sessionStorage.getItem("token")== '' || sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == null){
        return <Navigate to={"/inloggen"} replace state={{"next": props.path}} />;
    }

    return props.children;
};

export default ProtectedRoute;