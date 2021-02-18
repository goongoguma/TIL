import React from 'react';
import ReactDom from 'react-dom';
import { Overlay, ModalStyle, ModalButton } from './Styles';

function Modal({ open, onClose}) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>  
      <Overlay />
      <ModalStyle>
        <p>텍스트를 입력해주세요</p>
        <ModalButton onClick={onClose}>Close</ModalButton>
      </ModalStyle>
    </>,
    document.getElementById('portal')
  );
};

export default Modal
