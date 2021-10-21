import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, del, toggle } from "./redux/todoSlice";
import { getPosts } from "./redux/postsSlice";
import Modal from "./Modal";
import {
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
} from "./Styles";

function App() {
  const [task, setTesk] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { todos, posts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      return setIsOpen(true);
    }

    dispatch(add({ task }));
    setTesk("");
  };

  const handleRemove = (task) => {
    dispatch(del({ task }));
  };

  const handleToggle = (id) => {
    dispatch(toggle({ id }));
  };

  useEffect(() => {
    dispatch(getPosts({ limit: 5 }));
  }, [dispatch]);

  return (
    <div className="App">
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
      <AppHeader>
        <Container>
          <Title>Todo List</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              onChange={(e) => setTesk(e.target.value)}
              value={task}
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </Container>
        <Clearfix />
        <TodoContainer>
          {todos.map((item, index) => {
            return (
              <TodoList key={index}>
                <TodoCheckBox
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggle(item.id, item.completed)}
                />
                <p>{item.task}</p>
                <TodoDelButton onClick={() => handleRemove(item.task)}>
                  X
                </TodoDelButton>
              </TodoList>
            );
          })}
        </TodoContainer>
      </AppHeader>
    </div>
  );
}

export default App;
