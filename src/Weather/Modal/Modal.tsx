import { useRef } from "react";
import { OutSideClick } from "../../utils/OutSideClick";
import "./Modal.scss";

const Modal = (props: { setShowModal: (b: boolean) => void }) => {
  const handleCloseModal = () => {
    props.setShowModal(false);
  };

  // const ref = useOutSideClick(() => handleCloseModal());

  return (
    <OutSideClick clickOutside={handleCloseModal}>
      <div className="modal">
        <div className="modal-container">
          <div className="modal-top-bar">
            <p>Valbo</p>
          </div>
        </div>
      </div>
    </OutSideClick>
  );
};

export default Modal;
