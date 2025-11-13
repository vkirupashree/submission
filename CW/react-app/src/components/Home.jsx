import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to My Website 🌸</h1>
        <p className="home-subtitle">
          Explore my world of coding, design, and creativity. Enjoy a seamless experience as you navigate through the site.
        </p>
      </header>

      <section className="home-section">
        <h2>About This Site</h2>
        <p>
          This website showcases modern web development techniques using React, React Router, and responsive design. 
          Discover pages, demos, and examples that illustrate clean UI, authentication, and role-based navigation.
        </p>
      </section>

      <section className="home-section">
        <h2>Features</h2>
        <ul>
          <li>Seamless login and authentication system</li>
          <li>Role-based navigation and protected routes</li>
          <li>Clean, responsive, and modern UI design</li>
          <li>Landing page, demo pages, and content sections</li>
        </ul>
      </section>

      <section className="home-section">
        <h2>Enjoy Your Stay</h2>
        <p>
          Navigate the site using the menu above. Whether you are exploring as a visitor or logged in as a user, 
          you will find everything smooth, intuitive, and visually pleasant.
        </p>
      </section>
    </div>
  );
}
