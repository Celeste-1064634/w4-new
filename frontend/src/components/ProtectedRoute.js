import { Navigate, useParams } from 'react-router-dom';

const ProtectedRoute = (props) => {
    let { id } = useParams();
    if(sessionStorage.getItem("token")== '' || sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == null){
        if(id){
            return <Navigate to={"/inloggen"} replace state={{"next": props.path+"/"+id}} />;

        }else{
            return <Navigate to={"/inloggen"} replace state={{"next": props.path}} />;
        }
    }

    return props.children;
};

export default ProtectedRoute;