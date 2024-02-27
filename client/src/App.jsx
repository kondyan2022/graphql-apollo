import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./query/user";

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [users, setUsers] = useState([]);
  console.log(users, "<<<<<<");
  useEffect(() => {
    if (!loading) {
      console.log("setUsers", data.getAllUsers.length);
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  return (
    <div>
      <form>
        <input type="text" />
        <input type="number" />
        <div className="btns">
          <button>Create</button>
          <button>Get</button>
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
