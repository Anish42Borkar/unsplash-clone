import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utility/axiosInstance";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//components
import Spinner from "../../components/spinner";
import CModal from "../../components/CModal";
//icons
//icons
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    rootMargin: "2000px",
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

  const handleDownload = (item: string) => {
    //item.url = ""https://unsplash.com/photos/yC-Yzbqy7PY""
    window.open(item, "_blank");
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
              <div className="img_cont" key={key}>
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
                <div
                  className="img_overlay m-2"
                  onClick={() => {
                    storeCurrentIndex = key;
                    toggleModal();
                  }}
                >
                  <div className="w-100 h-100 position-relative">
                    <div className="position-absolute top-0 px-3 py-4 d-flex justify-content-end align-items-center w-100">
                      <div className=" bg-success p-2 rounded cursor-pointer">
                        <FavoriteIcon />
                      </div>
                    </div>

                    <div className="position-absolute bottom-0 px-3 py-4 d-flex justify-content-between align-items-center w-100">
                      <p className=" align-middle text-success m-0">
                        {item.user.first_name +
                          " " +
                          (item.user.last_name ?? "")}
                      </p>

                      <div
                        className=" bg-success p-2 rounded cursor-pointer"
                        onClick={() => {
                          handleDownload(item.urls.regular);
                        }}
                      >
                        <FileDownloadOutlinedIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
