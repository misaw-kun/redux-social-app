import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "first post",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "",
  },
  {
    id: nanoid(),
    title: "second post",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "",
  },
  {
    id: nanoid(),
    title: "third post",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    img: "",
  },
];

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
        img: action.payload.img || "",
      };
      state.push(post);
    },
    deletePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload.id);
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { addPost, deletePost, updatePost } = postSlice.actions;

export default postSlice.reducer;
