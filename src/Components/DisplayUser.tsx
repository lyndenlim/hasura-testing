import { gql, useQuery } from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
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
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {data.users.map((user: User) => (
        <div key={user.id}>
          {user.username}
          <br />
          {user.email}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DisplayUser;
