import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  const [users, setUsers] = useState([])

  // Get users when the page loads
  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      console.error('Error getting users:', error)
      return
    }

    console.log('All users:', data)
    setUsers(data)
  }

  // Add a new user
  async function addUser() {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username: 'harshkey'
        }
      ])
      .select('*')

    if (error) {
      console.error('Error adding user:', error)
      return
    }

    console.log('New user:', data)

    // Add the new user to the list
    setUsers((currentUsers) => [
      ...currentUsers,
      ...data
    ])
  }

  return (
    <div>
      <h1>Users</h1>

      <button onClick={addUser}>
        Add User
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}
          </li>
        ))}

      </ul>

      <div style={{
  border: '3px solid transparent',
  bordeRadius: '12px',
  height: '100px',
  width: '100px',
  borderRadius: '50%',
  background:"linear-gradient(white, white) padding-box,linear-gradient(90deg, #ff0080, #7928ca, #00c6ff) border-box",
}}>
        hello
      </div>
    </div>
  )
}

export default App