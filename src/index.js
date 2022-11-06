import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.js';

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark')
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>); 