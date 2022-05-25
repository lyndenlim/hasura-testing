import './App.css';
import { gql, useQuery } from "@apollo/client"

const GET_USERS = gql`
  {
    users {
      email
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="App">
      {data.users.email}
    </div>
  );
}

export default App;
