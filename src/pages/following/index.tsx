import React from "react";
// components
import Hero from "../../components/hero";
import MasonryLayout from "../../components/masonry_layout";

const Following = () => {
  return (
    <div className="mt-7 ps-5">
      <p className="fs-1 fw-bold">Following</p>
      <p className="fw-semibold fs-5">
        The latest photos from photographers you follow.
      </p>
      <p className="mt-8 fs-6">
        No photos to display. Follow some Unsplash photographers and check back
        soon.
      </p>
    </div>
  );
};

export default Following;
