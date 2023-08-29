import React from 'react';
import '../../css/todo/TodoListTemplate.css';

// 함수형 컴포넌트 
const TodoListTemplate = ({palette, form, children}) => { // (props) => { ... } 와 같이 비구조화 할당하는 대신 form과 children으로 비구조화 할당(=구조 분해 할당) 함
    return (
        <main className='todo-list-template'>
            <div className='todo-list-title'>
                오늘 할 일
            </div>
            <section className='palette-wrapper'>
                {palette}
            </section>
            <section className='form-wrapper'>
                {form}
            </section>
            <section className='todo-item-list-wrapper'>
                {children}
            </section>
        </main>
    );
};

export default TodoListTemplate;