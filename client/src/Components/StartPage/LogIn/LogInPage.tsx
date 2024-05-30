import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect, useContext } from 'react';
import {AuthContext} from "../../../App.tsx";
import '../Form.style.css';
import Axios from 'axios';

function LogInPage() {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from.pathname || '/';

  const userRef = useRef<HTMLInputElement>();
  const errRef = useRef<HTMLParagraphElement>();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, password]); //clear the error message when the user or password changes



  const onSubmitClick = async(e: any) => {
    e.preventDefault();

    try{

      const logIn_api = 'http://localhost:3005/users/login';
      const response = await Axios.post(logIn_api, {Username: user, Password: password});
      console.log(JSON.stringify(response?.data));
      const accessToken =String(response?.data?.accessToken);
      auth?.setAuth({Username: user, Password: password, RefreshToken:accessToken});
      console.log('Access Token from backend: ', JSON.stringify(accessToken));
      console.log('Access Token from context:', JSON.stringify(auth.auth.RefreshToken));
      setUser('');
      setPassword('');
      navigate(from, {replace: true});
      navigate('/home');
    }catch(err: any){
      if(err.response.status === 401){
        setErrMsg('Invalid username or password');
      }else if(err.response.status === 400){
        setErrMsg('Missing Username or Password');
      }else if(!err.response){
        setErrMsg('No server response');
      }else{
        setErrMsg('Login failed');
      }
      errRef.current?.focus();
    }
  };

  return (
    <section className="wrapper">
      <p ref={errRef} className={errMsg ? "errmsg" : "hide"} aria-live="assertive"> {errMsg} </p>
      <form onSubmit={onSubmitClick}>
            <h1>Log In</h1>

            <label htmlFor="username"></label>
            <div className="input-box">
                <input 
                  type="text" 
                  id="username"
                  placeholder="Username" 
                  ref={userRef}
                  autoCapitalize="off"
                  onChange = {(e) => setUser(e.target.value)}
                  value={user} //crucial if you want to ckear form upon submition
                  required
                />
                <FaUser className="icon"/>
            </div>

            <label htmlFor="password"></label>
            <div className="input-box">
                <input 
                  type="password" 
                  id="password"
                  placeholder="Password"
                  onChange = {(e) => setPassword(e.target.value)}
                  value={password} //crucial if you want to ckear form upon submition
                  required
                />
                <FaLock className="icon"/>
            </div>

            <button type="submit">Log In</button>

            <div className="register-link">
                <p>Don't have an account? <a href="#"><Link to="http://localhost:3000/register">Register</Link></a></p>
            </div>
        </form>
    </section>
  );
}

export default LogInPage;