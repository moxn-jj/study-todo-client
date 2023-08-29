import React from "react";
import '../../css/todo/TodoItem.css'

// 최적화하기 위하여 클래스형 컴포넌트로 작성
class TodoItem extends React.Component {

    // 최적화 : 업데이트가 불필요한 경우 render를 실행 하지 않는 것이 성능에 좋음
    // shouldComponentUpdate는 리렌더링 여부를 결정하는 함수로 미구현 시 true가 기본 값
    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.isComplete !== nextProps.isComplete;
    // }

    render() {
        const {content, isComplete, id, color, onToggle, onRemove} = this.props;

        return (
            // 최상위 요소에 onToggle 추가
            // onClick={onToggle{id}}와 같이 쓰면 안 됨. 이런 식으로 작성하게 되면 해당 함수가 렌더링 될 때 호출됨. 해당 함수가 렌더링 될 때 동작하면 데이터가 변경되고 데이터가 변경되면 리렌더링되면서 무한 호출이 일어남..
            <div className={`todo-item ${color}`} onClick={() => onToggle(id)}>

                {/* todo 지우는 부분 */}
                <div className="todo-item-remove" onClick={(e) => {
                    e.stopPropagation(); // onToggle 동작 방지, 만약 해당 작업이 없다면 취소를 눌렀을 때 해당 요소의 부모의 클릭 이벤트까지 반응을 하며 onRemove -> onToggle 순으로 함수가 실행되어버림. 부모까지 이벤트가 전달되지 못하도록 해줌
                    onRemove(id);
                }}>
                    &times;
                </div>

                {/* todo 내용 부분 */}
                {/* isComplete가 true일 때만, class에 isComplete 추가 */}
                {/* 아래와 같이 쓰면 false일 때, 클래스에 false라고 들어감. 그게 싫으면 삼항연산자로 쓰거나 classname이라는 함수로 처리할 수 있는데 후자는 라이브러리 추가 필요함 */}
                <div className={`todo-item-content ${isComplete && 'isComplete'}`}>
                    <div>
                        {content}
                    </div>
                </div>

                {/* todo 완료 부분 */}
                {
                    // isComplete가 true일 때만, div 요소 노출
                    isComplete && (<div className="isComplete-mark">v</div>)
                }
            </div>
        )
    }
}

export default TodoItem;