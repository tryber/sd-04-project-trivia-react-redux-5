import React from "react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

const Home = () => (
  <div>
    <header>
      <Link to="/Settings">
        <button type="button" data-testid="btn-settings">
          Settings
        </button>
      </Link>
    </header>
    <Login />
  </div>
);

export default Home;
