import styled from 'styled-components';

const Title = styled.h4`
  font-size: 1.5rem;
  text-align: center;
  color: #e7e7e7;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #e7e7e7;
  height: 30px;
  width: 200px;
  font-size: 20px;
  margin-right: 20px;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: transparent;
  border: 1px solid #e7e7e7;
  color: #e7e7e7;
  height: 34px;
  cursor: pointer;
  width: 70px;
  border-radius: 15px;
  &:focus {
    outline: none;
  }
`;

const AppHeader = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  padding: 30px;
`;

const Clearfix = styled.div`
  height: 191px;
`;

const TodoContainer = styled.ul`
  min-height: 700px;
`;

const TodoList = styled.li`
  display: flex;
  min-width: 354px;
  align-items: center;
  position: relative;
  height: 50px;
  & {
    list-style: none;
  }
`;

const TodoCheckBox = styled.input`
  margin-right: 20px;
`;

const TodoDelButton = styled.button`
  position: absolute;
  right: 0;
`;

// Modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .7);
  z-index: 1000
`;

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform translate(-50%, -50%);
  background: #282C34;
  padding: 50px;
  z-index: 1000;
  color: #fff;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const ModalButton = styled.button`
  width: 100%;
`;

export { 
  Title, 
  Input, 
  SubmitButton, 
  AppHeader, 
  Container, 
  Clearfix, 
  TodoContainer, 
  TodoList,
  TodoCheckBox,
  TodoDelButton,
  Overlay,
  ModalStyle,
  ModalButton
}