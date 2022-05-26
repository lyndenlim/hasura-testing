import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USERS } from "./DisplayUser";

const ADD_USER = gql`
  mutation InsertUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
      email
      username
    }
  }
`;

const updateCache = (cache: any, { data }: any) => {
  const existingUsers = cache.readQuery({ query: GET_USERS });

  const newUser = data.insert_users_one;
  cache.writeQuery({
    query: GET_USERS,
    data: { users: [...existingUsers.users, newUser] },
  });
};

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [insert_users, { loading, error }] = useMutation(ADD_USER, {
    variables: { object: { email: email, username: username } },
    update: updateCache,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Add User</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          insert_users();
          setEmail("");
          setUsername("");
        }}
      >
        <input
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Add a user</button>
      </form>
    </div>
  );
};

export default AddUser;
