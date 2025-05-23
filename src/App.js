import React from "react";
import Login from "./features/sign-auth/login";
import Register from "./features/sign-auth/Register";

function App() {
  return (
    <div>
      {/* Chỉ render 1 trong 2 tùy theo bạn muốn test trang nào */}
      <Login />
      {/* <Register /> */}
    </div>
  );
}

export default App;
