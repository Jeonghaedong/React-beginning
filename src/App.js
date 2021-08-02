import React, {useRef, useReducer, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users){
    console.log('활성 사용자수');
    return users.filter( user => user.active).length;
}
const initialState ={
  inputs: {
    username:'',
    email:''
  },
  users : [
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
  ]
}
function reducer(state, action){
  switch (action.type){
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
      case 'CREATE_USER':
      return{
        inputs : initialState.inputs,
        users : state.users.concat(action.user)
      }
      default : throw new Error('Unhandled action');
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState); //state 현재상태, dispatch 액션발생함수
  const nextId = useRef(4); // 기존 3개가 등록되어있어
  const { users } = state;
  const { username, email } =state.inputs;

  const onChange = useCallback( e => { //
    const {name, value} = e.target; // 이름과 값을 추출
    dispatch({ //어떤액션을 주는가
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: 1,
        username,
        email,
      }
    });
    nextId.current += 1;
  },[username, email])
  return (
    <>
    <CreateUser username={username} email={email} onChange={onchange} onCreate={onCreate} />
    <UserList users={users} />
    <div>활성자수 : 0 </div>
    </>
  )
}

export default App;
