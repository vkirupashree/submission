import React from "react";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>Hello There! 👋</h1>
        <p className="about-subtitle">
          I am Kirupashree, a passionate developer and designer creating amazing web experiences. I developed this webpage, and you can log in using your existing credentials or even register to explore more features.
        </p>
      </header>

      <section className="about-section">
        <h2>About Me</h2>
        <p>
          I love coding, designing, and building web apps that are both functional and beautiful. 
          Exploring new technologies, crafting intuitive UI, and learning every day keeps me motivated.
        </p>
      </section>

      <section className="about-section">
        <h2>Skills & Interests</h2>
        <ul>
          <li>React, Redux, and modern JavaScript</li>
          <li>Responsive UI/UX Design</li>
          <li>CSS, Tailwind, and styled-components</li>
          <li>Creating interactive web apps and components</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>My Philosophy</h2>
        <p>
          I believe in clean code, beautiful interfaces, and continuous learning. Every project is an opportunity 
          to create something meaningful and enjoyable for users.
        </p>
      </section>
    </div>
  );
}
