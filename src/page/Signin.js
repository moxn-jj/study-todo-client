import React, {useState, createContext} from "react";
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    
    const {setGlobalState} = useGlobalState();
    const navigate = useNavigate();
  
    const [ member, setMember ] = useState({
        email: ''
        , password: ''
    });
    const {email, password} = member;

    const handleChange = (e) => {
        setMember({
            ...member
            , [e.target.name]: e.target.value
        });
    }

    const submitSignin = (e) => {
        e.preventDefault();

        // TODO : add validation
        console.log('동작?');
        const {email, password} = member;
        const data = {
            body: JSON.stringify({
                email
                , password
            })
            , headers: {'Content-Type':'application/json'}
            , method: 'POST'
        };

        console.log(data);

        fetch('http://localhost:3000/api/auth/signin', data)
            .then(response => {
                if(!response.ok) {
                    return response.json();
                }else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('2');
                console.log(data);
                setGlobalState({
                    ...data
                });
                navigate('/');
            })
            .catch(error => {
                console.log('여긴왜?');
                console.log(error);
            });
    };
    
    return (
        <form className="pg-wrap signin-wrap" onSubmit={submitSignin}>
            <h3 className="pg-title">Sgin-In</h3>
            <ul className="pg-contents pg-type-lists">
                <li className="list">
                    <h4 className="ipt-title">email</h4>
                    <div className="ipt-contents">{/* error class name : red */}
                    <input type="text" name="email" placeholder="example@google.com" defaultValue={email} onChange={handleChange} />
                    </div>
                </li>
                <li className="list">
                    <h4 className="ipt-title">password</h4>
                    <div className="ipt-contents">
                        <input type="password" name="password" placeholder="TODO : password format" defaultValue={password} onChange={handleChange} />
                    </div>
                </li>
            </ul>
            <button type="submit" className="btn btn-type-full">submit</button>
        </form>
    );
}

export default Signin;