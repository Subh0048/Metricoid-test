import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import CreatePost from './components/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route  path="/posts" element={ <ProtectedRoute> <Posts/></ProtectedRoute>   }/>
                    <Route path="/posts/new" element={<ProtectedRoute> <CreatePost/></ProtectedRoute>}/>
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
