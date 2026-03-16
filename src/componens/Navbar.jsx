import { NavLink } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";

function Navbar() {
  const { clickSound } = useGlobal();
  const clickSfx = () => {
    clickSound.play();
  };
  return (
    <>
      <div className="fixed-bottom bg-white">
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item flex-fill text-center text-primary">
            <NavLink
              to="/"
              onClick={clickSfx}
              className={({ isActive }) =>
                `${isActive ? "nav-active fst-italic" : ""}`
              }
            >
              main
            </NavLink>
          </li>
          <li className="list-group-item flex-fill text-center text-primary">
            |
          </li>
          <li className="list-group-item flex-fill text-center">
            <NavLink
              to="/catatan"
              onClick={clickSfx}
              className={({ isActive }) =>
                `${isActive ? "nav-active fst-italic" : ""}`
              }
            >
              catatan
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
