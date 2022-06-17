import { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// icons
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export interface CModalProps {
  open: boolean;
  onHide(): void;
  imageListObj: Record<any, any>;
  currentIndex: number;
}

let valHolder: number;

const CModal: FC<CModalProps> = ({
  open,
  onHide,
  currentIndex = 0,
  imageListObj,
}): JSX.Element => {
  const [arrowControler, setArrowControler] = useState(currentIndex);

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

  useEffect(() => {
    console.log("render");
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* Modal heading */}
        </Modal.Title>
      </Modal.Header>

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
        <div className="modal_img_cont">
          <img
            className=""
            src={imageListObj[arrowControler]?.urls.regular}
            alt=""
            srcSet=""
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CModal;
