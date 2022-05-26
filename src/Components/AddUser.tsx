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

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [insert_users, { loading, error }] = useMutation(ADD_USER, {
    variables: { object: { email: email, username: username } },
    refetchQueries: [GET_USERS],
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Add User</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button
        onClick={() => {
          insert_users();
          setEmail("");
          setUsername("");
        }}
      >
        Add a user
      </button>
    </div>
  );
};

export default AddUser;
