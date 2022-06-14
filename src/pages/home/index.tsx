import { FC, useEffect, useState, useRef, RefObject, Ref } from "react";
// utility
import axiosInstance from "../../utility/axiosInstance";
// components
import Hero from "../../components/hero";
import MasonryLayout from "../../components/masonry_layout";
import Spinner from "../../components/spinner";

let filterImgUrls: string[] = [];

type StateProps = {
  count: number;
  images: string[];
};

let counter = 0;

const Home: FC = (): JSX.Element => {
  const [state, setState] = useState<StateProps>({
    images: [],
    count: 0,
  });
  const spinnerRef = useRef<HTMLDivElement>(null);

  const options: IntersectionObserverInit | undefined = {
    // root: null,
    rootMargin: "2000px",
    // threshold: 0.25,
  };

  const observer = new IntersectionObserver(observerCallback, options);

  function observerCallback<IntersectionObserverCallback>(e: any): any {
    if (e[0].isIntersecting) {
      state.count += 1;
      counter += 1;
      infiniteScrollUpdate();
    }
  }

  const infiniteScrollUpdate: Function = async (): Promise<void> => {
    const response = await axiosInstance
      .get("photos", { params: { page: state.count } })
      .catch((e: Record<any, any>) => e.response);
    filterImgUrls = response.data.map(
      (data: Record<any, any>) => data.urls.regular
    );
    setState((prev) => ({
      ...prev,
      images: [...prev.images, ...filterImgUrls],
    }));
  };

  useEffect(() => {
    counter++;
    infiniteScrollUpdate();
    if (spinnerRef.current) {
      observer.observe(spinnerRef.current as Element);
    }
    return () => {
      if (spinnerRef.current) observer.unobserve(spinnerRef.current as Element);
    };
  }, []);

  return (
    <div>
      <Hero />
      <MasonryLayout images={state.images} />
      <Spinner ref={spinnerRef} />
    </div>
  );
};

export default Home;
