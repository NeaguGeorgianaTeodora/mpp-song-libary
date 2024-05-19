import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../../Context/AuthProvider';
import '../Form.style.css';
import Axios from 'axios';
import { set } from "mongoose";

function LogInPage() {

  const navigate = useNavigate();

  const {setAuth} = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>();
  const errRef = useRef<HTMLParagraphElement>();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

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
      const data = response.data;
      console.log(JSON.stringify(data));
      const accessToken = data.accessToken;
      //const roles = data.roles;
      setAuth({Username: user, Password: password, AccessToken:accessToken});
      setUser('');
      setPassword('');
      setSuccess(true);
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