import { useEffect, useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutation/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(users, "<<<<<<");
  useEffect(() => {
    if (!loading) {
      console.log("setUsers", data.getAllUsers.length);
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const user = await newUser({ variables: { input: { username, age } } });
      console.log(user);
      setUsername("");
      setAge(0);
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async (e) => {
    e.preventDefault();
    try {
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="number"
          onChange={(e) => setAge(Number(e.target.value))}
          value={age}
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Create</button>
          <button onClick={(e) => getAll(e)}>Get</button>
        </div>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}. {user.username} {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
