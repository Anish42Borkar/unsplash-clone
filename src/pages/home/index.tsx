import { FC, useEffect, useState, useRef, RefObject, Ref } from "react";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
      infiniteScrollUpdate();
    }
  }

  const infiniteScrollUpdate: Function = async (): Promise<void> => {
    try {
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
    } catch (e) {
      setState((prev) => ({
        ...prev,
        images: [],
      }));
    } finally {
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    state.images = [];
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
      {/* <MasonryLayout images={state.images} /> */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1080: 4 }}
      >
        <Masonry>
          {state.images?.map((item: string, key: number) => {
            return (
              <img className="p-2" src={item} key={key} alt="" srcSet="" />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
      <Spinner ref={spinnerRef} />
    </div>
  );
};

export default Home;
