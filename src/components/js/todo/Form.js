import React, {useState} from "react";
import '../../css/todo/Form.css';

// const Form = ({ value, color, onChange, onCreate, onKeyDown }) => {
const Form = ({ onCreate, color }) => {
    
	// React Hook > 클래스 타입에서는 사용 X
	const [ input, setInput ] = useState('');

	// input 값 변경
	const handleChange = (event) => {
		setInput(event.target.value);
	}

	// Enter key event
	const handleKeyPress = (event) => {
		// 눌려진 키가 Enter key 인 경우 handleCreate 호출
		if(event.key === 'Enter') {
			onCreate(input);
			setInput('');
		}
	}

    return (
        <div className={`form ${color}`}>
        {/* <div className="form"> */}
            {/* 
            defaultValue : input 내용
            onChange : input 내용이 변경될 때 실행 될 함수
            onKeyDown : input에서 키 입력 시 실행 될 함수
            onCreate : input 버튼 클릭 시 실행 될 함수
             */}
            <input value={input} placeholder="새로운 일" onChange={handleChange} onKeyDown={handleKeyPress} />
            {/* <button type="button" className="create-btn" onClick={input}>추가</button> */}
            <button className="create-btn" onClick={() => {
					onCreate(input);
					setInput('');
				}
			}>추가</button>
        </div>
    );
};

export default Form;