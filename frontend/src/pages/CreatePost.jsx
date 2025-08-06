import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const URI = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(URI + "/api/posts", { content }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-start justify-center pt-12">
      {loading && <Loader />}
      <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Create a New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="post-content" className="sr-only">Post Content</label>
            <textarea
              id="post-content"
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
              placeholder="What's on your mind? Share your thoughts with the community..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            disabled={loading || content.trim() === ""}
          >
            {loading ? "Posting..." : "Post to Community"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;