import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Button, Table} from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getMentors} from '../actions/mentorActions'
import MentorModal from '../components/AddMentorModal'

const MentorsScreen = ({history}) => {
    const [message, setMessage] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const mentorLogin = useSelector(state => state.mentorLogin)
    const {userInfo} = mentorLogin;

    const mentorList = useSelector(state => state.mentorList)
    const {mentors, error, loading} = mentorList;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }   
        if(error) {
            setMessage(error);
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }

        dispatch(getMentors());
    }, [userInfo, history, dispatch, error])
    

    return (
        <>  
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
        <Row>
            <Button onClick={() => setModalShow(true)}>Add New Mentor</Button>
        </Row>
        <Row>
            <h3 style={{paddingTop: '40px'}}>Mentors</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {mentors && mentors.length > 0 ? mentors.map(mentor =>
                        <tr key={mentor._id}>
                            <td></td>
                            <td>{mentor.name}</td>
                            <td>{mentor.email}</td>
                        </tr>
                    ): null }
                    <tr>

                    </tr>
                </tbody>
            </Table>
        </Row>
        <MentorModal
            show={modalShow}
            onHide={() => setModalShow(false)}
      />
    </>
    )
}

export default MentorsScreen
