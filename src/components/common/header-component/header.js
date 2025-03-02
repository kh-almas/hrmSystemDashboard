import React, { useState, Fragment, useEffect, useLayoutEffect } from 'react';
import logo from '../../../assets/images/endless-logo.png';
import Language from './language';
import UserMenu from './userMenu';
import Notification from './notification';
import SearchHeader from './searchHeader';
import { Link } from 'react-router-dom';
import { AlignLeft, Maximize, Bell, MessageCircle, MoreHorizontal } from 'react-feather';

const Header = () => {
  const [sidebar, setSidebar] = useState(true);
  const [rightSidebar, setRightSidebar] = useState(true);
  const [headerbar, setHeaderbar] = useState(true);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 991) {
        setSidebar(false)
        document.querySelector(".page-main-header").classList.add('open');
        document.querySelector(".page-sidebar").classList.add('open');
      } else {
        setSidebar(true)
        document.querySelector(".page-main-header").classList.remove('open');
        document.querySelector(".page-sidebar").classList.remove('open');
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 991) {
      setSidebar(false)
      document.querySelector(".page-main-header").classList.add('open');
      document.querySelector(".page-sidebar").classList.add('open');
    } else {
      setSidebar(true)
      document.querySelector(".page-main-header").classList.remove('open');
      document.querySelector(".page-sidebar").classList.remove('open');
    }


  }, []);

  const openCloseSidebar = () => {
    setSidebar(prev => !prev);

    // if (!sidebar) {
    //   document.querySelector(".page-main-header").classList.add('open');
    //   document.querySelector(".page-sidebar").classList.add('open');
    // } else {
    //   document.querySelector(".page-main-header").classList.remove('open');
    //   document.querySelector(".page-sidebar").classList.remove('open');
    // }
  }
  useEffect(() => {
    if (!sidebar) {
      document.querySelector(".page-main-header").classList.add('open');
      document.querySelector(".page-sidebar").classList.add('open');
    } else {
      document.querySelector(".page-main-header").classList.remove('open');
      document.querySelector(".page-sidebar").classList.remove('open');
    }
  }, [sidebar]);

  function showRightSidebar() {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.add('show');
    } else {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.remove('show');
    }
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  return (
    <Fragment>
      <div className="page-main-header sticky-top bg-white py-2">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none col-auto">
            <div className="logo-wrapper">
              <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                <img className="img-fluid" src={"https://res.cloudinary.com/dov60yweq/image/upload/v1691910191/zuoc27jeudbakxrbfbpn.png"} alt="" />
              </Link>
            </div>
          </div>
          <div className="mobile-sidebar d-block col-auto">
            <div className="flex-grow-1 text-end switch-sm">
              <label className="switch">
                <span onClick={() => openCloseSidebar()} style={{ cursor: 'pointer' }}>
                  <AlignLeft />
                </span>
              </label>
            </div>
          </div>
          <div className="nav-right col p-0">
            <ul className={`nav-menus ${headerbar ? '' : 'open'}`}>
              {/*<li>*/}
              {/*  <SearchHeader />*/}
              {/*</li>*/}
              <li>
                <span onClick={goFull} className="text-dark">
                  <Maximize />
                </span>
              </li>
              <li className="onhover-dropdown">
                <Language />
              </li>
              <li className="onhover-dropdown">
                <Notification />
                <Bell />
                <span className="dot"></span>
                <Notification />
              </li>
              <li>
                <a href="#javascript" onClick={showRightSidebar}>
                  <MessageCircle />
                  <span className="dot"></span>
                </a>
              </li>
              <UserMenu />
            </ul>
            <div className="d-lg-none mobile-toggle pull-right" onClick={() => setHeaderbar(!headerbar)}><MoreHorizontal /></div>
          </div>
          <script id="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">
              <div className="ProfileCard-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-airplay m-0"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1">
                </path>
                  <polygon points="12 15 17 21 7 21 12 15"></polygon>
                </svg>
              </div>
              <div className="ProfileCard-details">
                <div className="ProfileCard-realName"></div>
              </div>
            </div>
          </script>
          <script id="empty-template" type="text/x-handlebars-template">
            <div className="EmptyMessage">{"Your search turned up 0 results. This most likely means the backend is down, yikes!"}</div>
          </script>
        </div>
      </div>
    </Fragment>
  )
};
export default Header;