import { faTimes, faInfoCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from 'react-router-dom'
import '../Form.style.css';
import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';

function RegisterPage(){
    const navigate = useNavigate();
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; 
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef<HTMLParagraphElement>();

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    //any tyme the user changes, check if it is valid
    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidUser(result);
    }, [user]);

    //any time either the password or matchPwd changes, check if it is valid and if it matches the matchPwd
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatchPwd(match);
    }, [password, matchPwd]);

    //any time either the password or matchPwd changes, check if it is valid and if it matches the password
    useEffect(() => {
        setErrMsg('');

    }, [user, password, matchPwd]);

    const onSubmitClick = async(e: any) => {
        e.preventDefault();
        //if button enabeled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg('Invalid username or password');
            return;
        }
        try {
            const register_api = 'http://localhost:3005/users/register';
            /*const response = await Axios.post(register_api, 
                JSON.stringify({username: user, password: password})
            );*/

            const response = await Axios.post(register_api, 
                {Username: user, Password: password}
            );
            console.log(JSON.stringify(response));
            setSuccess(true);
            navigate('/');
        } catch (error: any) {
            if(error.response.status === 409){
                setErrMsg('Username already exists. Please try another one.');
                
            }else if((error as any)?.response) {
                setErrMsg('No server response.');
            }else{
                setErrMsg('Registration failed.');
            }
            errRef.current?.focus();
            console.log(errMsg);
        }
    }

    return (
        <section className="wrapper">
            <p ref={errRef} className={errMsg ? "errmsg" : "hide"} aria-live="assertive"> {errMsg} </p>
            <form onSubmit={onSubmitClick}>
                <h1>Sign In</h1>

                <div className="input-box">
                    <label htmlFor="username"></label>
                    <input 
                        type="text"  
                        id="username"
                        ref={userRef}
                        autoCapitalize="off"
                        onChange = {(e) => setUser(e.target.value)}
                        placeholder="Username" 
                        required
                        aria-invalid={validUser ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <span className={validUser ? "valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validUser || !user ? "hide":"invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </div>
                
                <p id="uidnote" className={userFocus && user && !validUser ? "instructions":"hide"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters.<br />
                    Must start with a letter.<br />
                    Letters, numbers, hyphens, and underscores allowed.
                </p>

                <div className="input-box">
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <span className={validPassword ? "valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPassword || !password ? "hide":"invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </div>
                
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions":"hide"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters.<br />
                    Must include: Uppecase and lowercase lettern, numbers and special characters<br />
                    Allowed special characters: ! @ # $ %
                </p>

                <div className="input-box">
                    <label htmlFor="confirm_pwd"></label>
                    <input 
                        type="password" 
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        placeholder="Confirm Password" 
                        required
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                    />
                    <span className={validMatchPwd && matchPwd ? "valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validMatchPwd || !matchPwd ? "hide":"invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </div>
                
                <p id="confirm_pwd" className={matchPwdFocus && !validMatchPwd ? "instructions":"hide"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the first password input field.<br />
                </p>

                <button disabled={!validUser || !validPassword || !validMatchPwd ? true:false}>Register</button>

                <div className="register-link">
                    <p>Already have an account? <a href="#"><Link to="http://localhost:3000/">Log In</Link></a></p>
                </div>
            </form>
        </section>
    );
}

export default RegisterPage;