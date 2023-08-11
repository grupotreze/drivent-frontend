import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import { Button, ButtonGitHub } from '../../components/Form/Button';
import Link from '../../components/Link.js';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import {
  FaGithub, FaMailBulk
} from 'react-icons/fa';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(async() => {
    setLoading(false);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      try {
        setLoading(true);
        console.log(`Este é o code ${code}`);
        const response = await axios.post('http://localhost:4000/auth/api/github/token', { code });
        const result = response.data;
        
        localStorage.setItem('userData', JSON.stringify(result));
        
        window.location.href = '/dashboard';
      } catch (error) {
        setLoading(false);
        alert('Ocorreu um erro ao logar com o GitHub.');
        console.log(error);
      }
    }
  }, []);

  function redirectGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const GITHUB_CLIENT_ID = '7c14db5b1457efaa2efa';
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user',
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/sign-in'
    });

    const authURL = `${GITHUB_URL}?${params.toString()}`;
    
    window.location.href = authURL;
  }
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  } 

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        {/* <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" /> */}
        <Title>{eventInfo.title}</Title>
      </Row>
      {
        !loading ? 
          <>
            <Row>
              <Label>Entrar</Label>
              <form onSubmit={submit}>
                <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
                <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
                <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}><div><FaMailBulk/></div><p>Entrar com E-mail e Senha</p></Button>
              </form>
              <ButtonGitHub type="submit" color="primary" fullWidth disabled={loadingSignIn} onClick={redirectGitHub}><div><FaGithub/></div><p>Logar com GitHub</p></ButtonGitHub>
            </Row>
            <Row>
              <Link to="/enroll">Não possui login? Inscreva-se</Link>
            </Row>
          </>
          :
          <>
            <Row>
              <Label>Carregando...</Label>
            </Row>
            <Row>
            </Row>
          </>
      }
    </AuthLayout>
  );
}
