import React, { useState, useEffect } from "react";
import TodoListTemplate from "../components/js/todo/TodoListTemplate";
import Form from '../components/js/todo/Form'
import TodoItemList from '../components/js/todo/TodoItemList';
import Palette from "../components/js/todo/Palette";
import { useGlobalState } from '../util/GlobalStateContext.js';
import { useFetch } from '../util/useFetch';

const colors = ['white', 'red', 'green', 'blue'];

const Todo = () => {

    const commonFetch = useFetch();
    const { getAuthorization, setAuthorization } = useGlobalState();
    const [ color, setColor ] = useState('white');
    const [ todos, setTodos ] = useState([]);

    // 초기화 작업
    useEffect(() => {
        getTodos();
    }, []);  // 의존성 배열이 빈 배열이므로 이 useEffect는 컴포넌트가 마운트될 때 딱 한 번만 실행됩니다.
    

    // 공부를 위해 async로 만들었음
    async function getTodos() {

        // commonFetch에 await를 붙임으로써 commonFetch가 끝날 때까지 기다림
        await commonFetch(
            '/api/todo'
            , {method: 'GET'}
            , data => {
                console.log('2. 실행돼?');
                setTodos(data);
            }
        ).then(res => {
            console.log(res);
            console.log('3. 추가적인 로직이 필요한 경우');
        });

        console.log('4. commonFetch가 서버 응답까지 받아야 실행');
    }

    // form 컴포넌트에 필요한 기능
    // 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
    function createTodo(inputValue) {

        if(inputValue === ''){
            alert('할 일을 입력해 주세요.');
            return;
        }

        commonFetch(
            '/api/todo'
            , {
                method: 'POST'
                , body: JSON.stringify({"content":inputValue,"color":color})
            }
            , data => {
                setTodos(todos => [data, ...todos]);
            }
        );
    }

    function toggleTodo(id) {

        // 파라미터로 받은 id로 몇번째 아이템인지 찾기
        const index = todos.findIndex(todo => todo.id === id);

        if(!window.confirm(todos[index].isComplete? '완료를 취소하시겠습니까?' : '완료 처리하시겠습니까?')){
            return;
        }

        commonFetch(
            `/api/todo/${id}`
            , {
                method: 'PUT'
            }
            , () => {
                
                setTodos(todos.filter(todo => {
                    if(todo.id === id){
                        todo.isComplete = !todo.isComplete;
                    }
                    return todos;
                }));
            }
        );
    }

    function removeTodo(id) {
        const removeContent = todos.find(todo => todo.id === id).content;
        if(!window.confirm(`'${removeContent}를 삭제하시겠습니까?`)){
            return;
        }

        commonFetch(
            `/api/todo/${id}`
            , {
                method: 'DELETE'
            }
            , data => {
                setTodos(todos.filter(todo => todo.id !== id));
            }
        );
    };

    function handleColor(color){
        setColor(color);
    }

    return (
        <TodoListTemplate 
            /*
            1. form에서 input 내용을 변경하면 내부 state가 변경됨
            2. 해당 데이터를 등록하면 TodoItemList로 전달되어야 함

            => 이 때, form과 TodoItemList가 직접적으로 전달하는 것은 금지하며 (내부 컴포넌트 끼리는 대화하지 않음), 자식 컴포넌트는 부모를 통해서만 대화함

            3. 여기서 부모 컴포넌트는 App이기 때문에 해당 컴포넌트에 input(Form꺼)과 todos(TodoItemList꺼) 상태를 넣어줌
            4. App의 state를를 각각 컴포넌트에 props로 전달함
            */
            palette={<Palette
                    colors={colors}
                    onChangeColor={handleColor} />}

            // TodoListTemplate의 form
            form={<Form 
                    color={color}
                    onCreate={createTodo} 
                    />}>

            {/* TodoListTemplate의 children */}
            <TodoItemList 
                todos={todos}
                onToggle={toggleTodo}
                onRemove={removeTodo} />
        </TodoListTemplate>
    );
}

export default Todo;
