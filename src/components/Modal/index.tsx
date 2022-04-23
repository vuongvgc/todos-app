import './styles.css';

import React from 'react';

interface IModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
const Modal: React.FC<IModal> = (props) => {
  const className = props.isVisible
    ? "modal__box modal__box-display"
    : "modal__box";
  const handleOk = () => {
    props.onOk();
    handleCancel();
  };
  const handleCancel = () => {
    props.setIsVisible(false);
  };
  return (
    <div className={className}>
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>
          &times;
        </span>
        <h3 className="modal-title">Delete todos</h3>
        <p className="modal-content-detail">
          Do you want to delete all todos. Deleted to-dos cannot be recovered
        </p>
        <div className="todo-delete-box">
          <button className="button-accept" onClick={handleOk}>
            Accept
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
