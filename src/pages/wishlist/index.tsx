import { FC, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// utility
import axiosInstance from "../../utility/axiosInstance";
import checkIfIdExist from "../../utility/checkIfIdExist";
import {
  getWishListData,
  setWishList,
  removeFromWishList,
} from "../../redux/reducers/wishList";

// components
import Spinner from "../../components/spinner";
import CModal from "../../components/CModal";
//icons
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Plus from "../../assets/icons/plus.svg";

type StateProps = {
  images: string[];
  modal: boolean;
};

let storeCurrentIndex: number;

const Wishlist: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const wishListData = useSelector(getWishListData);

  const [state, setState] = useState<StateProps>({
    images: wishListData.list,

    modal: false,
  });

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

  const toggleModal = (): void => {
    setState((prev) => ({ ...prev, modal: !prev.modal }));
  };

  const trigerModal = (e: any, key: number): void => {
    storeCurrentIndex = key;
    toggleModal();
  };

  useEffect(() => {}, []);

  return (
    <div>
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
    </div>
  );
};

export default Wishlist;
