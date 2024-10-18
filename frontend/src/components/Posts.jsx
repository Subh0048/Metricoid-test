import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState({ id: '', title: '', content: '' });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Post deleted successfully!');
            fetchPosts(); 
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post: ' + error.response.data);
        }
    };

    const handleEditPost = (post) => {
        setEditPost({ id: post._id, title: post.title, content: post.content });
        setIsEditing(true);
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/posts/${editPost.id}`, 
                { title: editPost.title, content: editPost.content }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.status === 200) {
                alert('Post updated successfully!');
                setIsEditing(false);
                fetchPosts(); 
            }
        } catch (error) {
            console.error('Error updating post:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                alert('Failed to update post: ' + (error.response.data.message || 'Unknown error'));
            } else if (error.request) {
                alert('No response received from the server.');
            } else {
                alert('Error: ' + error.message);
            }
        }
    };
    
        const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/login');
        };
    

    
    

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container">
            <h2>Posts</h2>
            <Link to="/posts/new">Create New Post</Link>
            {isEditing && (
                <form onSubmit={handleUpdatePost}>
                    <h3>Edit Post</h3>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={editPost.title} 
                        onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} 
                        required 
                    />
                    <textarea 
                        placeholder="Content" 
                        value={editPost.content} 
                        onChange={(e) => setEditPost({ ...editPost, content: e.target.value })} 
                        required 
                    />
                    <div style={{ display: 'flex', marginTop: '10px' }}>
            <button type="submit">Save Changes</button>
            <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                style={{ marginLeft: '10px' }}
            >
                Cancel
            </button>
        </div> 
                </form>
            )}
            <ul>
        {posts.length > 0 ? (
            posts.map(post => (
                <li key={post._id}>
                    <h3>{post.title}</h3>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />}
                    <p>{post.content}</p>
                    <button onClick={() => handleEditPost(post)} style={{ marginRight: '10px' }}>Edit</button>
                    <button onClick={() => handleDeletePost(post._id)}>Delete</button>
                </li>
            ))
        ) : (
            <li>No posts available.</li>
        )}
    </ul>
           <div style={{display :'flex', justifyContent:'center'}}>
            <button onClick={()=>handleLogout()}>Logout</button>

           </div>
           
        </div>
    );
    
};

export default Posts;
