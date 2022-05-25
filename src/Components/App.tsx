import './App.css';
import { gql, useQuery } from "@apollo/client"

const GET_USERS = gql`
  {
    users {
      id
      email
      username
    }
  }
`

interface User {
  id: number;
  email: string;
  username: string;
}

function App() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="App">
      {data.users.map((user: User) =>
        <div key={user.id}>
          {user.username}
          <br />
          {user.email}
          <hr />
        </div>
      )}
    </div>
  );
}

export default App;
