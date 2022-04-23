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
        <h3>Xóa todos</h3>
        <p>
          Bạn có muốn xóa tất cả todos. Todos bị xóa sẽ không thể không phục
        </p>
        <div className="todo-delete-box">
          <button className="button-accept" onClick={handleOk}>
            Chấp nhận
          </button>
          <button onClick={handleCancel}>Hủy bỏ</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
