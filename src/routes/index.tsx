import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Following from "../pages/following";
import Topics from "../pages/topics";
import Search from "../pages/search";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="following" element={<Following />} />
        <Route path="topics/:id" element={<Topics />} />
        <Route path="Search" element={<Search />} />
      </Routes>
    </>
  );
};

export default Routers;
