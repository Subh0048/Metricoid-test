import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); 

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); 
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, { title, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Post created successfully!');
            setTitle('');
            setContent('');
            navigate('/posts'); 
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post: ' + error.response.data);
        }
    };

    return (
        <div className="container" style={{width:"600px"}}>
            <h2>Create Post</h2>
            <form onSubmit={handleCreatePost}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    required 
                />
                <textarea 
                    placeholder="Content" 
                    onChange={(e) => setContent(e.target.value)} 
                    value={content} 
                    required 
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
