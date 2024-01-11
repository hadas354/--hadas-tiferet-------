  /*eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";

export default function Posts() {
  const userData = JSON.parse(localStorage.getItem("currentUser"));
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState(""); // New state for the input field
  const [newPostBody,setNewPostBody]=useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/posts?userId=${userData.id}`
        );
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData.id]);

  const addNewPost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        body: JSON.stringify({
          userId: userData.id,
          title: newPostTitle,
          body: newPostBody,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        // Fetch the updated list of posts after adding a new one
        const updatedRes = await fetch(
          `http://localhost:3000/posts?userId=${userData.id}`
        );
        const updatedData = await updatedRes.json();
        setPosts(updatedData);
        setNewPostTitle(""); // Clear the input field after adding the new post
      } else {
        console.error("Failed to add new post:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new post:", error);
    }
  };

  const deletePost = async (index) => {
    const post = posts[index];
    let newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);

    try {
      const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updatePost = async (index) => {
    const currentTitle = posts[index].title;
    const newTitle = prompt("Enter a new title:", currentTitle);

    if (newTitle !== null) {
      let newPosts = [...posts];
      newPosts[index] = {
        ...newPosts[index],
        title: newTitle,
      };
      setPosts(newPosts);

      const post = newPosts[index];
      try {
        const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        if (!response.ok) {
          console.error("Failed to update post:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {/* Render posts */}
      {posts.map((element, index) => (
        <div key={index}>
          <h2>{element.id}</h2>
          <h3>{element.title}</h3>
          <button onClick={() => deletePost(index)}>Delete</button>
          <button onClick={() => updatePost(index)}>Update</button>
        </div>
      ))}

      {/* Add new post section */}
      <div>
        <label htmlFor="newPostTitle">New Post Title:</label>
        <input
          type="text"
          id="newPostTitle"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
         <input
          type="text"
          id="newPostBody"
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />
        <button onClick={addNewPost}>Add Post</button>
      </div>
    </div>
  );
}
