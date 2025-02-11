import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/actions.js';
import { selectAuthError,isAuthenticated  } from '../redux/auth/selectors';
import { isExists  } from '../redux/user/selectors';


const Login = () => {
  
  const [formData, setFormData] = useState({
    useremail: '',
    password: '',
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);
  const authenticated = useSelector(isAuthenticated);
  const avatarExists = useSelector(isExists);

  useEffect(() => {
    if (authenticated & avatarExists) {
      navigate('/home');
    }
  }, [authenticated, dispatch, avatarExists]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.useremail, formData.password))
      .then(() => {
        
      })
      .catch((error) => {
        
      });
  };



  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col sm={12} md={6} lg={4} className="mx-auto">
          <div className="text-center mb-4">
            <Image src="echoShareBlack.png" alt="Twitter Logo" rounded style={{ width: '70px', height: '70px' }} />
            <h3 style={{ marginTop: '12px' }}>Login</h3>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="UserEmailContainer">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="PasswordContainer" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>

            {authError && (
              <div className="text-danger text-center mt-3">
                {authError}
              </div>
            )}

            <div className="text-center mt-3">
              <small>
                Don't have an account?{' '}
                <Link to="/signup">Sign up here</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};




export default Login