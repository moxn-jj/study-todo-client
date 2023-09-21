import React, { useState, useRef } from "react";
import { useGlobalState } from '../util/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../util/useFetch';
import { isValidEmail, isValidPassword } from "../util/commonFuntion.js";

const Signup = () => {

    const navigate = useNavigate();
    const commonFetch = useFetch();

    // stat
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [error, setError] = useState({
        type: null
        , msg: null
    });

    // ref
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordCheckRef = useRef(null);

    // access token 초기화
    useEffect(() => {
        setAuthorization('');
    }, []);
    
	const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === 'email') {
            setEmail(value);
        }else if (name === 'password') {
            setPassword(value);
        }else if(name === 'passwordCheck') {
            setPasswordCheck(value);
        }
	}

    const validInput = () => {

        if(!isValidEmail(email)) {
            setError({
                type: 'email'
                , msg: '이메일 형식이 올바르지 않습니다.'
            });
            emailRef.current.focus();
            return false;
        }
        
        if(!isValidPassword(password)) {
            setError({
                type: 'password'
                , msg: '비밀번호 형식이 올바르지 않습니다.\n4자리 이상 입력해 주세요.'
            });
            passwordRef.current.focus();
            return false;
        }

        if(!isValidPassword(password, passwordCheck)) {
            setError({
                type: 'passwordCheck'
                , msg: '비밀번호가 일치하지 않습니다.'
            });
            passwordCheckRef.current.focus();
            return false;
        }
        
        setError({
            type: null
            , msg: null
        });

        return true;
    }

    const submitSignup = (e) => {
        e.preventDefault();

        if(!validInput()){
            return;
        }

        commonFetch(
            '/api/auth/signup'
            , {
                method: 'POST',
                body: JSON.stringify({
                    email
                    , password
                    , passwordCheck
                })
            }
            , () => {
                alert('회원가입이 완료되었습니다.');
                navigate('/sginin');
            }
        );
    };

    return (
        <form className="pg-wrap signup-wrap" onSubmit={submitSignup}>
            <h3 className="pg-title">Sgin-Up</h3>
            <ul className="pg-contents pg-type-lists">
                <li className="list">
                    <h4 className="ipt-title">email</h4>
                    <div className={`ipt-contents ${error.type === 'email' ? 'red' : ''}`}>
                        <input type="text" name="email" placeholder="example@google.com" defaultValue={email} onChange={handleChange} ref={emailRef} />
                        <div className="err-msg">{error.type === 'email' && error.msg}</div>
                    </div>
                </li>
                <li className="list">
                    <h4 className="ipt-title">password</h4>
                    <div className={`ipt-contents ${error.type === 'password' ? 'red' : ''}`}>
                        <input type="password" name="password" placeholder="4자 이상" defaultValue={password} onChange={handleChange} ref={passwordRef} />
                        <div className="err-msg">{error.type === 'password' && error.msg}</div>
                    </div>
                </li>
                <li className="list">
                    <h4 className="ipt-title">password check</h4>
                    <div className={`ipt-contents ${error.type === 'passwordCheck' ? 'red' : ''}`}>
                        <input type="password" name="passwordCheck" placeholder="비밀번호 확인" defaultValue={passwordCheck} onChange={handleChange} ref={passwordCheckRef} />
                        <div className="err-msg">{error.type === 'passwordCheck' && error.msg}</div>
                    </div>
                </li>
            </ul>
            <button type="submit" className="btn btn-type-full">submit</button>
        </form>
    );
}

export default Signup;