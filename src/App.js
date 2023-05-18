import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { useState } from "react";

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #747571;
`;

const HeadlineContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #6e6357;
`;

const FirstNameHeadlineContainer = styled.div``;

const DbContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  color: white;
  background-color: #7d6f60;
  font-size: 20px;
`;

const FirstNameContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;

const LastNameContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;

const PhoneContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;
const MailContainer = styled.div`
  background-color: #877765;
  width: 20%;
`;

const SaveButton = styled.button`
  background-color: green;
  color: white;
  font-weight: bold;
  width: 160px;
  height: 25px;
  &:hover {
    background-color: lightgreen;
    color: black;
  }
`;

const DeleteButton = styled.button`
  background-color: #c21717;
  color: white;
  font-weight: bold;
  width: 80px;
  height: 25px;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const EditButton = styled.button`
  background-color: #163dc9;
  color: white;
  width: 80px;
  font-weight: bold;
  height: 25px;
  &:hover {
    background-color: lightblue;
    color: black;
  }
`;

export default function App() {
  const [inputFieldFirstName, setInputFieldFirstName] = useLocalStorageState(
    "inputField",
    {
      defaultValue: [],
    }
  );
  const [inputFieldLastName, setInputFieldLastName] = useLocalStorageState(
    "inputFieldLastName",
    {
      defaultValue: [],
    }
  );
  const [inputFieldPhone, setInputFieldPhone] = useLocalStorageState(
    "inputFieldPhone",
    {
      defaultValue: [],
    }
  );
  const [inputFieldMail, setInputFieldMail] = useLocalStorageState(
    "inputFieldMail",
    {
      defaultValue: [],
    }
  );

  const [todos, setTodos] = useLocalStorageState("todos", { defaultValue: [] });
  const [checkId, setCheckId] = useLocalStorageState("checkId", {
    defaultValue: [],
  });
  const [initialFirstName, setInitialFirstName] = useState();
  const [initialLastName, setInitialLastName] = useState();
  const [initialPhone, setInitialPhone] = useState();
  const [initialMail, setInitialMail] = useState();

  const [editing, setEditing] = useState(false);

  function getInputFirstName(event) {
    setInputFieldFirstName(event.target.value);
  }
  function getInputLastName(event) {
    setInputFieldLastName(event.target.value);
  }
  function getInputPhone(event) {
    setInputFieldPhone(event.target.value);
  }
  function getInputMail(event) {
    setInputFieldMail(event.target.value);
  }

  function NoEditingMode() {
    return (
      <>
        <SaveButton onClick={save}>Save</SaveButton>
        <p>
          <h2>Database:</h2>
          <HeadlineContainer>
            <FirstNameHeadlineContainer>
              <h3>First Name</h3>
            </FirstNameHeadlineContainer>
            <h3>Last Name</h3>
            <h3>Phone</h3>
            <h3>Mail</h3>
            <h3>Actions</h3>
          </HeadlineContainer>
          {todos.map((todo) => (
            <li key={todo.id}>
              <DbContainer>
                <FirstNameContainer>{todo.name}</FirstNameContainer>
                <LastNameContainer> {todo.lastName} </LastNameContainer>
                <PhoneContainer>{todo.phone} </PhoneContainer>
                <MailContainer>{todo.mail} </MailContainer>

                <EditButton
                  className="editButton"
                  type="button"
                  onClick={() => {
                    handleEditTodoFirstName(todo.name);
                    handleEditTodoLastName(todo.lastName);
                    handleEditTodoPhone(todo.phone);
                    handleEditTodoMail(todo.mail);
                    handleCheckId(todo.id);
                    setEditing(true);
                  }}
                >
                  Edit
                </EditButton>

                <DeleteButton
                  className="deleteButton"
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </DeleteButton>
              </DbContainer>
            </li>
          ))}
        </p>
      </>
    );
  }

  function EditingMode() {
    return (
      <>
        <SaveButton
          onClick={() => {
            saveUpdate();
            setEditing(false);
          }}
        >
          Save and Update
        </SaveButton>
        <p>
          <h2>Database:</h2>
          <HeadlineContainer>
            <FirstNameHeadlineContainer>
              <h3>First Name</h3>
            </FirstNameHeadlineContainer>
            <h3>Last Name</h3>
            <h3>Phone</h3>
            <h3>Mail</h3>
            <h3>Actions</h3>
          </HeadlineContainer>

          {todos.map((todo) => (
            <li key={todo.id}>
              <DbContainer>
                <FirstNameContainer>{todo.name}</FirstNameContainer>
                <LastNameContainer> {todo.lastName} </LastNameContainer>
                <PhoneContainer>{todo.phone} </PhoneContainer>
                <MailContainer>{todo.mail} </MailContainer>
                <EditButton
                  className="editButton"
                  type="button"
                  onClick={() => {
                    handleEditTodoFirstName(todo.name);
                    handleEditTodoLastName(todo.lastName);
                    handleEditTodoPhone(todo.phone);
                    handleEditTodoMail(todo.mail);
                    setEditing(true);
                  }}
                >
                  Edit
                </EditButton>

                <DeleteButton
                  className="deleteButton"
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </DeleteButton>
              </DbContainer>
            </li>
          ))}
        </p>
      </>
    );
  }

  function save() {
    setTodos([
      ...todos,
      {
        name: initialFirstName,
        lastName: initialLastName,
        phone: initialPhone,
        mail: initialMail,
        id: uid(),
      },
    ]);
    setInitialFirstName("");
    setInitialLastName("");
    setInitialPhone("");
    setInitialMail("");
  }

  function saveUpdate(todo) {
    setTodos(
      todos.map((todos) =>
        todos.id === checkId
          ? {
              ...todos,
              name: initialFirstName,
              lastName: initialLastName,
              phone: initialPhone,
              mail: initialMail,
              id: checkId,
            }
          : todos
      )
    );

    setInitialFirstName("");
    setInitialLastName("");
    setInitialPhone("");
    setInitialMail("");
  }

  function handleInputFirstName(event) {
    setInitialFirstName(event.target.value);
  }
  function handleInputLastName(event) {
    setInitialLastName(event.target.value);
  }
  function handleInputPhone(event) {
    setInitialPhone(event.target.value);
  }
  function handleInputMail(event) {
    setInitialMail(event.target.value);
  }

  function handleDeleteTodo(todoToDelete) {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete));
  }

  function handleEditTodoFirstName(todoToEdit) {
    setInitialFirstName(todoToEdit);
  }
  function handleEditTodoLastName(todoToEdit) {
    setInitialLastName(todoToEdit);
  }
  function handleEditTodoPhone(todoToEdit) {
    setInitialPhone(todoToEdit);
  }
  function handleEditTodoMail(todoToEdit) {
    setInitialMail(todoToEdit);
  }

  function handleCheckId(todoToCheck) {
    setCheckId(todoToCheck);
  }

  return (
    <>
      <div className="App">
        <h1>Customer-Management-System</h1>
      </div>
      <InputContainer>
        <label>
          First Name:
          <input
            value={initialFirstName}
            onInput={getInputFirstName}
            onChange={handleInputFirstName}
          ></input>
        </label>
        <label>
          Last Name:
          <input
            value={initialLastName}
            onInput={getInputLastName}
            onChange={handleInputLastName}
          ></input>
        </label>
        <label>
          Phone:
          <input
            value={initialPhone}
            onInput={getInputPhone}
            onChange={handleInputPhone}
          ></input>
        </label>
        <label>
          Mail:
          <input
            value={initialMail}
            onInput={getInputMail}
            onChange={handleInputMail}
          ></input>
        </label>
      </InputContainer>

      {editing ? <EditingMode /> : <NoEditingMode />}
    </>
  );
}