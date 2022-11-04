import { useEffect } from "react";
import { useState } from "react";

function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("currentUser");

    if (userData) {
      setUserName(JSON.parse(userData).full_name);
    }
  }, []);

  return <div>Hello {userName}</div>;
}

export default Welcome;
