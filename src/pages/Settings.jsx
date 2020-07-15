import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => (
  <div>
    <h4 data-testid="settings-title">Settings</h4>
    <Link to='/'>
      <button>Back to home</button>
    </Link>
  </div>
);

export default Settings;
