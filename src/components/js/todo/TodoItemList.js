import React from "react";
import TodoItem from "./TodoItem";

// TodoItem 컴포넌트 여러 개를 렌더링하는 역할
// 동적인 리스트를 렌더링 할 때는 함수형이 아닌, 클래스형 컴포넌트로 작성하는 것이 좋음 => 컴포넌트 성능 최적화를 할 수 있음
class TodoItemList extends React.Component {

    // 업데이트가 필요한 경우에만 render 실행하여 자원 낭비 방지
    // 컴포넌트의 re-render 여부를 결정하는 라이프 사이클 메서드
    // 구현하지 않으면 true 반환하여 항상 re-render 됨
    // shouldComponentUpdate(nextProps, nextState){

    //     // 기존 todos
    //     // console.log(this.props.todos);
        
    //     // 그냥 키 입력만 있을 때 : 기존 todos
    //     // 추가 버튼을 눌렀을 때 : 새로 추가한 todo까지 포함
    //     // console.log(nextProps.todos);

    //     return this.props.todos !== nextProps.todos;
    // }

    render() {
        // todos : todo 객체 배열
        // onToggle : 체크박스 토글 시 발생하는 함수
        // onRemove : todo 하나를 삭제하는 함수
        const {todos, onToggle, onRemove} =  this.props;

        const todoList = todos.map (
            // (todo) => (
            // 비구조화 할당
            ({id, content, isComplete, color}) => (
                <TodoItem 
                    id={id}
                    content={content}
                    isComplete={isComplete}
                    color={color}
                    // {...todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    // 배열을 렌더링할 때는 반드시 key 값이 있어야함 
                    // 없는 경우는 map의 두번째 파라미터를 사용하면 되지만 권장하지는 않음
                    key={id} />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;