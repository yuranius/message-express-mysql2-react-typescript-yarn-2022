import { useRoutes } from "./pages/routes";
import { BrowserRouter as Router} from "react-router-dom";
import React, {useEffect} from "react";
import { Navbar } from "./components/Navbar";
import {TOKEN_DATA, USER_DATA} from "./config";
import {useDispatch, useSelector} from "react-redux";
import {  useMassage } from "./hooks/message.hook"
import {setAuthUser} from "./store/authReducer";



function App() {

  const massage = useMassage()

  let isAuthenticated = false

  const userData = JSON.parse(localStorage.getItem(USER_DATA) as string)
  const tokenData = JSON.parse(localStorage.getItem(TOKEN_DATA) as string)

  const dispatch = useDispatch()


  if (tokenData) {
    isAuthenticated = !!tokenData.token;
  }




  const routes = useRoutes(isAuthenticated);

  // для переренеринга компонента
  let over = useSelector((state:any) => state.over)

  useEffect(() => {
    if (userData) {
      dispatch(setAuthUser(userData)) //задиспатчим, то что находится в localStorage
    }
    massage(over.massage)
  }, [isAuthenticated])


  return (
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className="container">{routes}</div>
      </Router>
  );
}

export default App;

