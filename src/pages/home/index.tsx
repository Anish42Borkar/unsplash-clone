import { FC, useEffect, useState, useRef, MouseEventHandler } from "react";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// utility
import axiosInstance from "../../utility/axiosInstance";
// components
import Hero from "../../components/hero";
import Spinner from "../../components/spinner";
import CModal from "../../components/CModal";
//icons
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Plus from "../../assets/icons/plus.svg";

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
  const downloadBtnRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = async (e: any, item: string) => {
    e.stopPropagation();
    const response = await axiosInstance.get(item);
    const res = await fetch(response.data.url);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "download";
    a.click();
  };

  const trigerModal = (e: any, key: number): void => {
    storeCurrentIndex = key;
    toggleModal();
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
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
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
                    onClick={(e) => {
                      trigerModal(e, key);
                    }}
                  />
                  <div
                    className="img_overlay m-2"
                    onClick={(e) => {
                      trigerModal(e, key);
                    }}
                  >
                    <div className="w-100 h-100 position-relative">
                      <div className="position-absolute top-0 px-3 py-4 d-flex justify-content-end align-items-center w-100">
                        <div
                          className="fav bg-success p-2 rounded cursor-pointer"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            e.target.classList.toggle("text-danger");
                          }}
                        >
                          <FavoriteIcon />
                        </div>
                        <div className=" bg-success p-2 ms-2 rounded cursor-pointer">
                          <img src={Plus} alt="" srcSet="" className="w-6" />
                        </div>
                      </div>

                      <div className="position-absolute bottom-0 px-3 py-4 d-flex justify-content-between align-items-center w-100">
                        <p className=" align-middle text-success m-0">
                          {item.user.first_name +
                            " " +
                            (item.user.last_name ?? "")}
                        </p>

                        <div
                          ref={downloadBtnRef}
                          className=" bg-success p-2 rounded cursor-pointer"
                          onClick={(e) => {
                            handleDownload(e, item.links.download_location);
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
