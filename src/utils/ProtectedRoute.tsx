import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/auth/authSlice";

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const { user } = useAppSelector(userSelector);
  if (user === null) return <h1>Loading...</h1>;
  if (user !== null) {
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
