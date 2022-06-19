import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
//util
import axiosInstance from "../../utility/axiosInstance";
import checkIfIdExist from "../../utility/checkIfIdExist";
import {
  getWishListData,
  setWishList,
  removeFromWishList,
} from "../../redux/reducers/wishList";

// icons
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Plus from "../../assets/icons/plus.svg";

export interface CModalProps {
  open: boolean;
  onHide(): void;
  imageListObj: Record<any, any>;
  currentIndex: number;
}

const CModal: FC<CModalProps> = ({
  open,
  onHide,
  currentIndex = 0,
  imageListObj,
}): JSX.Element => {
  const wishListData = useSelector(getWishListData);
  const dispatch = useDispatch();
  const [arrowControler, setArrowControler] = useState(currentIndex);
  const [state, setState] = useState({
    zoom: false,
  });

  const goToPreviusImage = (): void => {
    if (arrowControler > 0) {
      setArrowControler((prev) => prev - 1);
    }
  };

  const goToNextImage = (): void => {
    if (arrowControler < imageListObj.length - 1) {
      setArrowControler((prev) => prev + 1);
    }
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

  const zoomToggle = () => {
    setState((prev) => ({ ...prev, zoom: !prev.zoom }));
  };

  useEffect(() => {
    state.zoom = false;
    setArrowControler((prev) => currentIndex);
  }, [currentIndex]);

  return (
    <Modal
      show={open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
      centered
    >
      <div className="w-100 p-2 d-flex justify-content-end">
        <div
          className={`fav bg-success p-2 rounded cursor-pointer ${
            checkIfIdExist(
              wishListData.list,
              imageListObj[arrowControler]?.id
            ) && "text-danger"
          }`}
          onClick={(e: any) => {
            e.stopPropagation();
            if (e.target.classList.contains("text-danger")) {
              dispatch(removeFromWishList(imageListObj[arrowControler].id));
            } else {
              dispatch(setWishList(imageListObj[arrowControler]));
            }
            e.target.classList.toggle("text-danger");
          }}
        >
          <FavoriteIcon />
        </div>
        <div className=" bg-success p-2 mx-2 rounded cursor-pointer">
          <img src={Plus} alt="" srcSet="" className="w-6" />
        </div>

        <ButtonGroup
          size="sm"
          className=" me-5"
          onClick={(e) => {
            handleDownload(
              e,
              imageListObj[arrowControler].links.download_location
            );
          }}
        >
          <Button className="border">Download</Button>
          <Button className="w-7 border d-flex justify-content-center align-items-center">
            <FileDownloadOutlinedIcon />
          </Button>
        </ButtonGroup>
        <div
          className=" position-absolute end-0 mx-1 mt-1  rounded cursor-pointer"
          onClick={(e: any) => {
            e.stopPropagation();
            onHide();
          }}
        >
          <CloseRoundedIcon style={{ fontSize: 36 }} />
        </div>
      </div>

      <Modal.Body>
        <div
          className="position-absolute top-50 start-0  transition-middle  cursor-pointer"
          onClick={goToPreviusImage}
        >
          {" "}
          <ArrowBackIosRoundedIcon style={{ fontSize: 44 }} />{" "}
        </div>

        <div
          className="position-absolute top-50 end-0 transition-middle cursor-pointer"
          onClick={goToNextImage}
        >
          {" "}
          <ArrowForwardIosRoundedIcon style={{ fontSize: 44 }} />{" "}
        </div>
        <div className={`modal_img_cont ${state.zoom && "zoomed"}`}>
          <img
            className=""
            src={imageListObj[arrowControler]?.urls.regular}
            alt=""
            srcSet=""
            onClick={zoomToggle}
          />
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default CModal;
