import "./NavBar.scss";
import UserIcon from "assets/UserIcon";

const NavBar = () => {
  const username = "test@gmail.com";

  function logOut() {}

  return (
    <nav className="nav-bar">
      <h1 className="nav-bar__logo">TODO</h1>
      <div className="nav-bar__container">
        <p className="nav-bar__username">{username}</p>
        <UserIcon className={"nav-bar__user-icon"} />
        <button className="nav-bar__log-out" onClick={logOut}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
