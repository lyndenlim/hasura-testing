import { gql, useQuery, useMutation } from "@apollo/client";

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

interface User {
  id: number;
  email: string;
  username: string;
}
const DisplayUser: React.FC = () => {
  const {
    loading: usersQueryLoading,
    error: usersQueryError,
    data: users,
  } = useQuery(GET_USERS);

  const [deleteUser, { loading, error, data }] = useMutation(DELETE_USER, {
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
