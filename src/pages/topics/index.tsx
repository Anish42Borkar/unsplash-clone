import { useEffect, useRef, useState } from "react";
import { Params, useParams } from "react-router-dom";
import axiosInstance from "../../utility/axiosInstance";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Spinner from "../../components/spinner";
import CModal from "../../components/CModal";

type ParamTypes = {
  id: string;
};

type StateProps = {
  count: number;
  images: string[];
  modal: boolean;
};

let storeCurrentIndex: number;

const Topics = () => {
  const { id } = useParams<ParamTypes>();
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<StateProps>({
    images: [],
    count: 1,
    modal: false,
  });

  const options: IntersectionObserverInit | undefined = {
    // root: null,
    rootMargin: "2000px",
    // threshold: 0.25,
  };

  const observer = new IntersectionObserver(observerCallback, options);

  function observerCallback<IntersectionObserverCallback>(e: any): any {
    if (e[0].isIntersecting) {
      state.count += 1;
      getTopicImages(id);
    }
  }

  const getTopicImages = async (id?: string): Promise<void> => {
    try {
      const response = await axiosInstance.get("topics/" + id + "/photos", {
        params: { page: state.count },
      });
      setState((prev) => ({
        ...prev,
        images: [...prev.images, ...response.data],
      }));
    } catch (e) {}
  };

  const toggleModal = (): void => {
    setState((prev) => ({ ...prev, modal: !prev.modal }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    state.images = [];
    getTopicImages(id as string);
    if (spinnerRef.current) {
      observer.observe(spinnerRef.current as Element);
    }
    return () => {
      if (spinnerRef.current) observer.unobserve(spinnerRef.current as Element);
    };
  }, [id]);
  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1080: 4 }}
      >
        <Masonry>
          {state.images?.map((item: any, key: number) => {
            return (
              <img
                className="p-2 cursor-zoom-in"
                src={item.urls.regular}
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
    </div>
  );
};

export default Topics;
