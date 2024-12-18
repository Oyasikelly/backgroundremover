import { NavLink } from "react-router-dom";

export default function Menu({handleCloseMenu}){
    return <div className="Menu" onClick={handleCloseMenu}>
              <span style={{ fontSize: "24px" }}>&#10006;</span>
              <NavLink to="/SavedImages">
                <p>See Saved Images</p>
              </NavLink>
            </div>
}