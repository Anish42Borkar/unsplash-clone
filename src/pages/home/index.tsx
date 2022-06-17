import { FC, useEffect, useState, useRef } from "react";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// utility
import axiosInstance from "../../utility/axiosInstance";
// components
import Hero from "../../components/hero";
import Spinner from "../../components/spinner";
import CModal from "../../components/CModal";

type StateProps = {
  count: number;
  images: string[];
  modal: boolean;
};

let storeCurrentIndex: number;

const Home: FC = (): JSX.Element => {
  const [state, setState] = useState<StateProps>({
    images: [],
    count: 1,
    modal: false,
  });
  const spinnerRef = useRef<HTMLDivElement>(null);

  const options: IntersectionObserverInit | undefined = {
    rootMargin: "2000px",
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

      setState((prev) => ({
        ...prev,
        images: [...prev.images, ...response.data],
      }));
    } catch (e) {
      setState((prev) => ({
        ...prev,
        images: [],
      }));
    } finally {
    }
  };
  const toggleModal = (): void => {
    setState((prev) => ({ ...prev, modal: !prev.modal }));
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

  useEffect(() => {}, [storeCurrentIndex]);

  return (
    <div>
      <Hero />
      <div className="mh-100">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1080: 4 }}
        >
          <Masonry>
            {state.images?.map((item: any, key: number) => {
              return (
                <img
                  className="p-2 cursor-zoom-in"
                  src={item.urls?.regular as string}
                  key={key}
                  alt=""
                  srcSet=""
                  onClick={() => {
                    storeCurrentIndex = key;
                    toggleModal();
                  }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      <CModal
        open={state.modal}
        onHide={toggleModal}
        imageListObj={state.images}
        currentIndex={storeCurrentIndex}
      />
      <Spinner ref={spinnerRef} />
    </div>
  );
};

export default Home;
