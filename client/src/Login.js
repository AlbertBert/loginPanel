import Rect, { useRef } from 'react';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import "antd/dist/antd.css";
import "./login.css";

const md5 = require('md5');


export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegister = () => {
    const username = usernameRef.current.input.value;
    if (!username) {
      message.error('请输入用户名');
      return;
    }
    const password = passwordRef.current.input.value;
    if (!password) {
      message.error('请输入密码');
      return;
    }
    console.log('username', username, password, md5(password));
    axios.post('/user/register', {
      username,
      password: md5(password)
    }).then(res => {
      console.log('res', res);
      if (res?.data?.code === 0) {
        message.info('注册成功，请登陆');
      } else {
        message.error(res?.data?.message);
      }
    }).catch(err => {
      console.log('err', err);
    })
  }

  const handleLogin = () => {
    const username = usernameRef.current.input.value;
    if (!username) {
      message.error('请输入用户名');
      return;
    }
    const password = passwordRef.current.input.value;
    if (!password) {
      message.error('请输入密码');
      return;
    }
    console.log('username', username, password, md5(password));
    axios.post('/user/login', {
      username,
      password: md5(password)
    }).then(res => {
      console.log('res', res);
      if (res?.data?.code === 0) {
        message.info('登陆成功');
      } else {
        message.error(res?.data?.message);
      }
    }).catch(err => {
      console.log('err', err);
    })
  }
  return (
    <div className='login-panel'>
      <div className='title'>登陆</div>
      <div className='username-container'>
        <div className='username-label'>用户名</div>
        <Input placeholder="input username" className='username-input' ref={usernameRef} />
      </div>
      <div className='password-container'>
        <div className='password-label'>密码</div>
        <Input.Password placeholder="input password" className='password-input' ref={passwordRef} />
      </div>
      <Button type="primary" className='login' onClick={() => {
        handleLogin();
      }}>登陆</Button>
      <div className='register-container'>
        还没账户？<div className='register' onClick={() => {
          handleRegister();
        }}>立即注册</div>
      </div>
    </div>
  )
}