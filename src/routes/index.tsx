import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Following from "../pages/following";
import Topics from "../pages/topics";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="following" element={<Following />} />
        <Route path="topics/:id" element={<Topics />} />
      </Routes>
    </>
  );
};

export default Routers;
