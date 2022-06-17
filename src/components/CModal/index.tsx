import { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export interface CModalProps {
  open: boolean;
  onHide(): void;
  imageListObj: Record<any, any>;
  currentIndex: number;
}

const CModal: FC<CModalProps> = ({
  open,
  onHide,
  currentIndex,
  imageListObj,
}): JSX.Element => {
  return (
    <Modal
      show={open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
      // dialogClassName="position-relative"
      centered
    >
      {/* <div className="">div</div> */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* Modal heading */}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal_img_cont">
          <img
            className=""
            src={imageListObj[currentIndex]?.urls.regular}
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
