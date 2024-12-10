import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser, setUsers } from './store/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idToUpdate, setIdToUpdate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: Date.now(), name, email };

    if (idToUpdate) {
      dispatch(updateUser({ id: idToUpdate, ...user }));
      setIdToUpdate(null);
    } else {
      dispatch(addUser(user));
    }

    setName('');
    setEmail('');
  };

  const handleUpdate = (user) => {
    setIdToUpdate(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleSetUsers = () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];
    dispatch(setUsers(mockUsers));
  };

  return (
    <div>
      <h1>User Management</h1>

      <button onClick={handleSetUsers}>Load Mock Users</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{idToUpdate ? 'Update User' : 'Add User'}</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleUpdate(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
