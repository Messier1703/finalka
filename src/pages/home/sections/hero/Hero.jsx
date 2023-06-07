import React from 'react';
import s from './Hero.module.scss';

function Hero() {
  return (
    <section className={s.hero}>
      <div className="container">
        <nav className={s.hero_nav}>
          <a href="" className={s.hero_logo}></a>
          <div className="hero_links">
            <a href="#" className="hero_link">О нас</a>
            <a href="#" className="hero_link">О нас</a>
            <a href="#" className="hero_link">О нас</a>
          </div>
        </nav>
        <div className={s.hero_text}>
          <h1 className={s.hero_title}>Экобокс</h1>
          <p className="hero_desc">Сервис для поставки экоящиков</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;