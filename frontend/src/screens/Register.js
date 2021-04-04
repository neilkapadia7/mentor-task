import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {register} from '../actions/mentorActions';

const RegisterScreen = ({ history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const mentorRegister = useSelector(state => state.mentorRegister)
    const {loading, error} = mentorRegister;

    const mentorLogin = useSelector(state => state.mentorLogin)
    const {userInfo} = mentorLogin;

    useEffect(() => {
        if(userInfo) {
            history.push('/');
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match');
        }
        else {
            setMessage(null);
            dispatch(register(name, email, password));
            // console.log(name, email, password)
        }
    }

    return (
        <FormContainer>
            <h1>Add New Mentors</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Add Mentor
                </Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;
