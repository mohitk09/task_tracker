import { AmplifySignOut } from "@aws-amplify/ui-react";

function Header() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ float: "right", padding: "10px" }}>
        <AmplifySignOut />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 style={{ marginLeft: "20px" }}>Task Manager</h1>
      </div>
    </div>
  );
}

export default Header;
