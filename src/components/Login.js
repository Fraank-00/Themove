import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Navigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regexEmail = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;

    if (!regexEmail.test(email)) {
      Swal.fire('Email no válido');
      return;
    }
    if (email === '') {
      Swal.fire('El campo de email no puede estar vacío');
      return;
    }
    if (password === '') {
      Swal.fire('El campo de contraseña no puede estar vacío');
      return;
    }
    if (email !== 'challenge@alkemy.org' || password !== 'react') {
      Swal.fire('Credenciales inválidas');
      return;
    }

    axios.post('http://challenge-react.alkemy.org', { email, password })
      .then(res => {
        Swal.fire('Ingresaste correctamente');
        const tokenRecibido = res.data.token;
        sessionStorage.setItem('token', tokenRecibido);
        navigate('/listado'); // Redirigir al usuario a /listado
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error al enviar los datos');
      });
  };

  const token = sessionStorage.getItem('token');
  if (token) {
    return <Navigate to="/listado" />;
  }

  return (
    <Form onSubmit={submitHandler} className="form-container">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Ingresar
      </Button>
    </Form>
  );
};

export default Login;
