import React, { useState, /* useEffect */ } from "react";
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


import { Link, /* useLocation */ } from "react-router-dom";


// const Logger = () => {
//   const { isAuthenticated, profile } = useAuth();
//   const [open, setOpen] = useState(false);
//   let roles = JSON.stringify(profile.roles)
//   if (roles) {
//     roles = roles.replaceAll('"', "")
//   }
//   return (
//     <div >
//       <HeaderGlobalAction className="user-global-ha" aria-label="User" onClick={ () => setOpen(!open) } onBlur={ (e) => {
//         // setTimeout(() => {
//         //   console.log(`e`, e);
//         //   // setOpen(false);
//         // }, 200)
//       } } >
//         <User />
//       </HeaderGlobalAction>
//       {
//         !open ? null :
//           <div className="session-log__wrapper">
//             { !isAuthenticated ? null :
//               <div className="account__wrapper">
//                 <div className="bx--account-switcher--information">
//                   <p className="user-email" hidden={ true } >{ profile.email }</p>
//                   <div data-profile-name="" data-source-profile-name="profileName" className="">
//                     <p>{ profile.displayName }</p>
//                     <h6 style={ { color: '#f4f4f4' } } > Roles: { roles }</h6>
//                   </div>
//                 </div>
//               </div>
//             }
//             <div className="session__wrapper">
//               <Button className="session__btn" renderIcon={ isAuthenticated ? Logout : Login } kind="secondary"
//                 onClick={ () => {
//                   console.log("login");
//                   if (isAuthenticated)
//                     return window.location = 'auth/logout';
//                   window.location = 'auth/login'
//                 } } >
//                 { `${isAuthenticated ? "Logout" : "Login"}` }
//               </Button>
//             </div>
//           </div>
//       }
//     </div>
//   );

// }

const NavBar = ({ lngs }) => {


  // const { pathname } = useLocation();

  // function handleClick(lang) {
  //   i18n.changeLanguage(lang)
  // }

  return (
    <Header aria-label="NavBar">
      <SkipToContent />
      <HeaderName element={ Link } to="/" prefix="">
        <b>IoParking</b>
      </HeaderName>
      <HeaderNavigation aria-label="App-Navbar">
        {/* <HeaderMenuItem element={Link} to={`/page-link`}>{t('NavHeader.8')}</HeaderMenuItem> */ }

      </HeaderNavigation>
      <HeaderGlobalBar>
        {/* <Logger /> */}
      </HeaderGlobalBar>

    </Header>
  )
};

export default NavBar;
