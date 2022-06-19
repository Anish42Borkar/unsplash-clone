import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Following from "../pages/following";
import Topics from "../pages/topics";
import Search from "../pages/search";
import Wishlist from "../pages/wishlist";

const Routers = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="following" element={<Following />} />
        <Route path="topics/:id" element={<Topics />} />
        <Route path="Search" element={<Search />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default Routers;
