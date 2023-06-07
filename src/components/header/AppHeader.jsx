import React from 'react';
import s from './AppHeader.module.scss'

function AppHeader() {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header_nav}>
          <a href="#" className={s.header_logo}>logo</a>
          <div className={s.header__links}>
          <a href="#" className={s.header_link}>link</a>
          <a href="#" className={s.header_link}>link</a>
          <a href="#" className={s.header_link}>link</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;