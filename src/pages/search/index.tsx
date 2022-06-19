import { FC, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Spinner from "../../components/spinner";
//utility
import axiosInstance from "../../utility/axiosInstance";
import checkIfIdExist from "../../utility/checkIfIdExist";
import {
  getWishListData,
  setWishList,
  removeFromWishList,
} from "../../redux/reducers/wishList";
//components
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

let storeLocation: string;
let storeCurrentIndex: number;

const Search: FC = (): JSX.Element => {
  const location: Record<any, any> = useLocation();

  const [state, setState] = useState<StateProps>({
    images: [],
    count: 1,
    modal: false,
  });
  const spinnerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const wishListData = useSelector(getWishListData);

  const options: IntersectionObserverInit | undefined = {
    // root: null,
    rootMargin: "80%",
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

  useEffect(() => {
    window.scrollTo(0, 0);
    state.images = [];
    state.count = 1;
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
                      <div
                        className={`fav bg-success p-2 rounded cursor-pointer ${
                          checkIfIdExist(wishListData.list, item.id) &&
                          "text-danger"
                        } `}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          if (e.target.classList.contains("text-danger")) {
                            dispatch(removeFromWishList(item.id));
                          } else {
                            dispatch(setWishList(item));
                          }
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
                        className=" bg-success p-2 rounded cursor-pointer"
                        onClick={(e: any) => {
                          handleDownload(e, item.urls.regular);
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
    </>
  );
};

export default Search;
