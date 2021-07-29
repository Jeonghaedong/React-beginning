import React, {useRef, useState } from 'react';
import CreateUser from './CreateUser';
import Hello from './hello';
import InputSample from './InputSample';
import UserList from './UserList';


function App() {
  const [inputs, setInputs] = useState({
    username:'',
    emaili:''
  });
  const { username, email} = inputs;
  const onChange = e =>{
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  }
  const [users, setUsers] = useState([
    {
        id :1,
        username : 'velopert',
        email: 'public.velopert@gmail.com'
    },
    {
        id :2,
        username : 'tester',
        email: 'tester@example.com'
    },
    {
        id :3,
        username : 'lis',
        email : 'lis@gmail.com'
    }
    //spread 연산자

]);
  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    //setUsers([...users, user]); 두가지방법
    setUsers([users.concat(user)]);
    setInputs({
    username: '',
    email:''
    });
  }
  return (
    <>
    <CreateUser
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users={users}/>
    </>
  )
}

export default App;
