import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './screens/Login';
import Register from './screens/Register';
import TaskScreen from './screens/TaskScreen';
import MentorsScreen from './screens/MentorsScreen';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          {/* /api/mentors */}
          <Route path='/' component={TaskScreen}  exact/>
          <Route path='/mentors' component={MentorsScreen}  exact/>
          <Route path='/login' component={Login}  exact/>
          <Route path='/register' component={Register}  exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
