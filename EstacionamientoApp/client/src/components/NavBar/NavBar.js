import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  // HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from "carbon-components-react/es/components/UIShell";
import { Button } from "carbon-components-react";

import {
  User20 as User,
  Logout16 as Logout,
  Login16 as Login,
} from "@carbon/icons-react";


import { Link, useNavigate, /* useLocation */ } from "react-router-dom";

import app from "../../state/base.js";
import { AuthContext } from "../../state/useAuth";



const Logger = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  // create a reference so we can attache it to a component to render
  const ref = useRef();

  // useEffect will run and create a event lisener that will evaluate if the login section should close
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [open])

  // attach ref to the div wrapper of this component
  return (
    <div ref={ref}>
      <HeaderGlobalAction className="user-global-ha" aria-label="User" onClick={() => setOpen(!open)}>
        <User />
      </HeaderGlobalAction>
      {
        !open ? null :
          <div className="session-log__wrapper">
            {!currentUser ? null :
              <div className="account__wrapper">
                <div className="bx--account-switcher--information">
                  {/* <p className="user-email" hidden={true} >{currentUser?.multiFactor?.user?.email}</p> */}
                  <div data-profile-name="" data-source-profile-name="profileName" className="">
                    <p>{currentUser?.multiFactor?.user?.email}</p>
                  </div>
                </div>
              </div>
            }
            <div className="session__wrapper">
              <Button className="session__btn" renderIcon={!!currentUser ? Logout : Login} kind="secondary"
                onClick={() => {
                  console.log("login");
                  if (!!currentUser)
                    return app.auth().signOut();
                  navigate('/login');
                }} >
                {`${!!currentUser ? "Logout" : "Login"}`}
              </Button>
            </div>
          </div>
      }
    </div>
  );

}

const NavBar = ({ lngs }) => {


  // const { pathname } = useLocation();

  // function handleClick(lang) {
  //   i18n.changeLanguage(lang)
  // }

  return (
    <Header aria-label="NavBar">
      <SkipToContent />
      <HeaderName element={Link} to="/" prefix="">
        <b>IoParking</b>
      </HeaderName>
      <HeaderNavigation aria-label="App-Navbar">
        {/* <HeaderMenuItem element={Link} to={`/page-link`}>{t('NavHeader.8')}</HeaderMenuItem> */}

      </HeaderNavigation>
      <HeaderGlobalBar>
        <Logger />
      </HeaderGlobalBar>

    </Header>
  )
};

export default NavBar;
