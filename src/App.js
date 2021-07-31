import React, {useRef, useState, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import Hello from './hello';
import InputSample from './InputSample';
import UserList from './UserList';

function countActiveUsers(users){
    console.log('활성 사용자수');
    return users.filter( user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username:'',
    emaili:''
  });

  const { username, email} = inputs;
  const onChange = useCallback(e =>{
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  }, [inputs]);
  const [users, setUsers] = useState([
    {
        id :1,
        username : 'velopert',
        email: 'public.velopert@gmail.com',
        active : true,

    },
    {
        id :2,
        username : 'tester',
        email: 'tester@example.com',
        active : false,
    },
    {
        id :3,
        username : 'lis',
        email : 'lis@gmail.com',
        active : false,
    }
    //spread 연산자

]);
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]); 
    //setUsers([users.concat(user)]); 두가지방법
    setInputs({
    username: '',
    email:''
    });
    nextId.current += 1;
  }, [username, email, users]);

    const onRemove = useCallback(id => {
      setUsers(users.filter(user => user.id !== id));
    }, [users]);

    const onToggle = useCallback(id => {
      setUsers(users.map(
        user => user.id === id
        ? { ...user, active: !user.active }
        : user
      ));
    }, [users]);
    const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
    <CreateUser
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    <div>활성자수 : {count}</div>
    </>
  )
}

export default App;
