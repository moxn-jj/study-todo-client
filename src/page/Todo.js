import React, { useState, useEffect } from "react";
import TodoListTemplate from "../components/js/todo/TodoListTemplate";
import Form from '../components/js/todo/Form'
import TodoItemList from '../components/js/todo/TodoItemList';
import Palette from "../components/js/todo/Palette";
import { useGlobalState } from '../context/GlobalStateContext.js';

const colors = ['white', 'red', 'green', 'blue'];

const Todo = () => {

    const { getAuthorization, setAuthorization } = useGlobalState();
    const [ color, setColor ] = useState('white');
    const [ todos, setTodos ] = useState([]);

    // ***************** backend 연동 시작 *****************
    // 초기화 작업
    useEffect(() => {
        console.log(getAuthorization());
        fetch("/api/todos", {
                authorization: getAuthorization()
            })
            .then(response => {
                if(!response.ok) {
                    return response.json();
                }else {
                    return response.json();
                }
            })
            .then(data => {
                // this.setState({todos : todos})
                // setTodos(todos);
                console.log(data);
            })
            .catch(err => console.log(err));
    }, []);  // 의존성 배열이 빈 배열이므로 이 useEffect는 컴포넌트가 마운트될 때 딱 한 번만 실행됩니다.
    
    function handleInitInfo() {

        fetch("/api/todos", {
                authorization: getAuthorization()
            })
            .then(response => {
                if(!response.ok) {
                    return response.json();
                }else {
                    return response.json();
                }
            })
            .then(res => res.json())
            .then(todos => {
                // this.setState({todos : todos})
                // setTodos(todos);
            })
            .catch(err => console.log(err));
    }
    // ****************** backend 연동 끝 ******************

    // form 컴포넌트에 필요한 기능
    // 텍스트 내용이 변경되면 state 업데이트
    // handleChange(event) {
    //     this.setState({
    //         input: event.target.value // input의 현재 값
    //     });
    // }

    // form 컴포넌트에 필요한 기능
    // 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
    function handleCreate(inputValue) {

        // const {color, todos} = this.state;

        if(inputValue === ''){
            alert('할 일을 입력해 주세요.');
            return;
        }
        setTodos(todos.concat({ 
                // id: this.id++
                id: todos.length + 1
                // , content: input
                , content: inputValue
                , isComplete: false
                , color: color
            })
        );

        const data = {
            body: JSON.stringify({"content":inputValue,"color":color})
            , headers: {
                    'Content-Type':'application/json'
                    , authorization: getAuthorization()
                }
            , method: 'post'
        };

        console.log(data);

        fetch("/api/todos", data)
            .then(response => {
                console.log(response);
                if(!response.ok) {
                    console.log('실패!');
                    return response.json().then(err => {
                        throw {errorCode: err.errorCode, errorMessage: err.errorMessage};
                    });
                }else {
                    console.log('성공!');

                    const newAccessToken = response.headers.get('Authorization');
                    if(newAccessToken) {
                        console.log('newAccessToken2');
                        setAuthorization(newAccessToken);
                    }
                }
            })
            .catch(err => {
                console.log('err');
                console.log(err);
                alert(`${err.errorMessage} (${err.errorCode})`);
            });

    }

    // form 컴포넌트에 필요한 기능
    // input에서 엔터 눌리면 버튼 클릭과 동일하게 실행되기
    // handleKeyDown(event) {
    //     if(event.key === 'Enter'){
    //         this.handleCreate();
    //     }
    // }

    function handleToggle(id) {
        const {todos} = this.state;

        // 파라미터로 받은 id로 몇번째 아이템인지 찾기
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];

        if(!window.confirm(selected.isComplete? '완료를 취소하시겠습니까?' : '완료 처리하시겠습니까?')){
            return;
        }

        // 배열 복사. 추후 최적화하기 위하여 배열을 직접 수정하지 않음
        // 이 때 전개연산자(...)를 사용하였기 때문에 deep copy가 아닌 shallow copy가 발생함. 따라서 오버헤드가 발생하지 않음
        const nextTodos = [...todos]; 
        
        // nextTodos 배열 중 선택한 요소를 재정의 함
        // isComplete를 제외한 요소는 그대로 작성을 하고, isComplete만 값을 토글시켜줌
        // 이 때 위에서 todos를 얕은 복사했기 때문에 바로 isComplete 값을 변경하는 것이 아니고 새로 정의함
        nextTodos[index] = {
            ...selected,
            isComplete : !selected.isComplete
        };

        setTodos(nextTodos);

        const data = {
            header: {'Content-Type':'application/json'}
            , method: 'put'
        };

        fetch('/api/todos/' + id, data)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status);
                }else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));

    }

    function handleRemove(id) {
        const {todos} = this.state;

        const removeContent = todos.find(todo => todo.id === id).content;
        if(!window.confirm(`'${removeContent}를 삭제하시겠습니까?`)){
            return;
        }

        // 파라미터로 받은 id를 가지지 않은 배열을 새로 생성
        setTodos(todos.filter(todo => todo.id !== id));

        const data = {
            header: {'Content-Type':'application/json'}
            , method: 'delete'
        }
        fetch("/api/todos/" + id, data)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status);
                }else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    };

    function handleColor(color){
        setColor(color);
    }

    // const {input, todos, color} = this.state;
    // const {handleChange
    //     , handleCreate
    //     , handleKeyDown
    //     , handleToggle
    //     , handleRemove
    //     , handleColor} = this;

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
                    // value={input} 
                    color={color}
                    // onChange={handleChange} 
                    onCreate={handleCreate} 
                    // onKeyDown={handleKeyDown} 
                    />}>

            {/* TodoListTemplate의 children */}
            <TodoItemList 
                todos={todos}
                onToggle={handleToggle}
                onRemove={handleRemove} />
        </TodoListTemplate>
    );
}

export default Todo;
