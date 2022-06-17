import { FC, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Spinner from "../../components/spinner";

//utility
import axiosInstance from "../../utility/axiosInstance";

//components
import CModal from "../../components/CModal";

type StateProps = {
  count: number;
  images: string[];
  modal: boolean;
};

let storeLocation: string;
let storeCurrentIndex: number;

const Search: FC = (): JSX.Element => {
  const location: Record<any, any> = useLocation();

  const [state, setState] = useState<StateProps>({
    images: [],
    count: 0,
    modal: false,
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
      onSubmit(storeLocation);
    }
  }

  const onSubmit = async (data: string): Promise<void> => {
    try {
      const response = await axiosInstance.get("search/photos", {
        params: {
          query: data,
          page: state.count,
        },
      });

      setState((prev) => ({
        ...prev,
        images: [...prev.images, ...response.data.results],
      }));
      console.log(response.data.results);
    } catch (e) {}
  };

  const toggleModal = (): void => {
    setState((prev) => ({ ...prev, modal: !prev.modal }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    state.images = [];
    state.count = 0;
    storeLocation = location.state?.str as string;
    onSubmit(location.state?.str);

    if (spinnerRef.current) {
      observer.observe(spinnerRef.current as Element);
    }
  }, [location.state?.str]);
  useEffect(() => {
    toggleModal;
    return () => {
      if (spinnerRef.current) observer.unobserve(spinnerRef.current as Element);
    };
  }, []);

  return (
    <>
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
      <CModal
        open={state.modal}
        onHide={toggleModal}
        imageListObj={state.images}
        currentIndex={storeCurrentIndex}
      />

      <Spinner ref={spinnerRef} />
    </>
  );
};

export default Search;
