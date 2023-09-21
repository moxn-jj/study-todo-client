import React, { useState, useRef } from "react";
import { useGlobalState } from '../util/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../util/useFetch';
import { isValidEmail, isValidPassword } from "../util/commonFuntion.js";

const Signin = () => {
    
    const navigate = useNavigate();
    const commonFetch = useFetch();
    const {setGlobalState, setAuthorization} = useGlobalState();

    // stat
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        type: null
        , msg: null
    });

    // ref
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    // access token 초기화
    useEffect(() => {
        setAuthorization('');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
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

        setError({
            type: null
            , msg: null
        });

        return true;
    }

    const submitSignin = (e) => {
        e.preventDefault();

        if(!validInput()){
            return;
        }

        commonFetch(
            '/api/auth/signin'
            , {
                method: 'POST',
                body: JSON.stringify({
                    email
                    , password
                })
            }
            , data => {
                setGlobalState({
                    ...data
                });
                navigate('/');
            }
        );
    };
    
    return (
        <form className="pg-wrap signin-wrap" onSubmit={submitSignin}>
            <h3 className="pg-title">Sign-In</h3>
            <ul className="pg-contents pg-type-lists">
                <li className="list">
                    <h4 className="ipt-title">email</h4>
                    <div className={`ipt-contents ${error.type === 'email' ? 'red' : ''}`}>
                    <input type="text" name="email" placeholder="example@google.com" value={email} onChange={handleChange} ref={emailRef} />
                    <div className="err-msg">{error.type === 'email' && error.msg}</div>
                    </div>
                </li>
                <li className="list">
                    <h4 className="ipt-title">password</h4>
                    <div className={`ipt-contents ${error.type === 'password' ? 'red' : ''}`}>
                        <input type="password" name="password" placeholder="4자 이상" value={password} onChange={handleChange} ref={passwordRef} />
                        <div className="err-msg">{error.type === 'password' && error.msg}</div>
                    </div>
                </li>
            </ul>
            <button type="submit" className="btn btn-type-full">submit</button>
        </form>
    );
}

export default Signin;