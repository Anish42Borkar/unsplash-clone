import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Following from "../pages/following";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="following" element={<Following />} />
      </Routes>
    </>
  );
};

export default Routers;
