import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

export const GET_USERS = gql`
  {
    users {
      id
      email
      username
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

const EDIT_USER = gql`
  mutation EditUser(
    $_set: users_set_input
    $pk_columns: users_pk_columns_input!
  ) {
    update_users_by_pk(_set: $_set, pk_columns: $pk_columns) {
      id
      email
      username
    }
  }
`;

interface User {
  id: number;
  email: string;
  username: string;
}
const DisplayUser: React.FC = () => {
  const [newEmail, setNewEmail] = useState<String>("");
  const [newUsername, setNewUsername] = useState<String>("");

  const {
    loading: usersQueryLoading,
    error: usersQueryError,
    data: users,
  } = useQuery(GET_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [GET_USERS],
  });

  const [editUser] = useMutation(EDIT_USER, {
    refetchQueries: [GET_USERS],
  });

  if (usersQueryLoading) return <div>Loading...</div>;
  if (usersQueryError) return <div>{usersQueryError.message}</div>;

  return (
    <div>
      {users.users.map((user: User) => (
        <div key={user.id}>
          {user.username}
          <br />
          {user.email}
          <br />
          <input
            placeholder="New Username"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            placeholder="New Email"
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            onClick={() => {
              setNewEmail("");
              setNewUsername("");
              editUser({
                variables: {
                  _set: { email: newEmail, username: newUsername },
                  pk_columns: { id: user.id },
                },
              });
            }}
          >
            Edit
          </button>
          <br />
          <button onClick={() => deleteUser({ variables: { id: user.id } })}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DisplayUser;
