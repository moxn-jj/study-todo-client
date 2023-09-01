import React, {useState} from "react";

// class Signup extends React.Component {
const Signup = () => {

    const [ member, setMember ] = useState({
        email: ''
        , password: ''
        , passwordCheck: ''
    });
    const {email, password, passwordCheck} = member;
    
	const handleChange = (e) => {
		setMember({
            ...member
            , [e.target.name]: e.target.value
        });
	}

    const submitSignup = (e) => {
        e.preventDefault();

        // TODO : add validation

        const {email, password, passwordCheck} = member;

        const data = {
            body: JSON.stringify({
                email
                , password
                , passwordCheck
            })
            , headers: {'Content-Type':'application/json'}
            , method: 'POST'
        };

        console.log(data);

        fetch('http://localhost:3000/api/auth/signup', data)
            .then(res => {
                if(!res.ok) {
                    throw new Error(res.status);
                }else {
                    console.log(res);
                    return successTemp();
                }
            })
            .catch(err => console.log(err));
    };

    const successTemp = () => {
        console.log('TODO : 성공 시 동작하는 임시 함수입니다.');
    }

    return (
        <form className="pg-wrap signup-wrap" onSubmit={submitSignup}>
            <h3 className="pg-title">Sgin-Up</h3>
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
                <li className="list">
                    <h4 className="ipt-title">password check</h4>
                    <div className="ipt-contents">
                        <input type="password" name="passwordCheck" placeholder="TODO : password format" defaultValue={passwordCheck} onChange={handleChange} />
                    </div>
                </li>
            </ul>
            <button type="submit" className="btn btn-type-full">submit</button>
        </form>
    );
}

export default Signup;