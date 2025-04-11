import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Dùng createRoot thay vì render
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker"; // ✅ Import đúng file

// ✅ Tạo root từ React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Đăng ký service worker để hỗ trợ hoạt động offline
serviceWorker.register();
