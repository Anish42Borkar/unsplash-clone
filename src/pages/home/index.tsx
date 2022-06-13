import React, { useEffect, useState } from "react";
// utility
import axiosInstance from "../../utility/axiosInstance";
// components
import Hero from "../../components/hero";
import MasonryLayout from "../../components/masonry_layout";

let filterImgUrls: string[] = [];

type StateProps = {
  images: string[];
};

const Home = () => {
  const [state, setState] = useState<StateProps>({ images: filterImgUrls });

  const infiniteScrollUpdate: Function = async (): Promise<void> => {
    const response = await axiosInstance
      .get("photos", { params: { page: 42 } })
      .catch((e: Record<any, any>) => e.response);
    filterImgUrls = response.data.map(
      (data: Record<any, any>) => data.urls.regular
    );
    const previusImages: string[] = [...state.images, ...filterImgUrls];
    setState((prev) => ({ ...prev, images: previusImages }));
  };
  const getPhoteList: Function = async (): Promise<void> => {
    const response = await axiosInstance
      .get("photos")
      .catch((e: Record<any, any>) => e.response);
    filterImgUrls = response.data.map(
      (data: Record<any, any>) => data.urls.regular
    );
    setState((prev) => ({ ...prev, images: filterImgUrls }));
  };
  useEffect((): void => {
    getPhoteList();
  }, []);
  return (
    <div>
      {" "}
      <Hero />
      <MasonryLayout images={state.images} />
    </div>
  );
};

export default Home;
