import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Routers from "./routes";
// components
import NavBar from "./components/navBar";
//utility
import axiosInstance from "./utility/axiosInstance";
import { setTopicList } from "./redux/reducers/topics";

import "./styles/App.css";

function App() {
  const dispatch = useDispatch();

  const getListOfTopics = async (): Promise<void> => {
    const response: Record<any, any> = await axiosInstance
      .get("topics")
      .catch((e) => e.response);
    dispatch(setTopicList(response.data));
  };

  useEffect(() => {
    getListOfTopics();
  }, []);
  return (
    <>
      <NavBar />
      <Routers />
    </>
  );
}

export default App;

// H4oRaODzx-C2WvBad5qLTWEAe8yLnSBTbD4cC2-SqXw  0vw75hlBnvUHggArJbPTYrc1cY1r6wxUD3TLyjelVkA
