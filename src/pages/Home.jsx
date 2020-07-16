import React from 'react';
import { Link } from 'react-router-dom';
import GravatarLogin from '../components/GravatarLogin';

const Home = () => (
  <div>
    <header>
      <Link to="/Settings">
        <button type="button" data-testid="btn-settings">
          Settings
        </button>
      </Link>
    </header>
    <GravatarLogin />
  </div>
);

export default Home;
