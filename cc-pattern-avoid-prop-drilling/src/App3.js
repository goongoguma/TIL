import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{ backgroundColor: 'lightgray'}}>
        <Header />
      </div>
      <div style={{flex: 1}}>
        {
          currentUser ? (
            <Dashboard>
              <DashboardNav />
              <DashboardContent>
                <WelcomMessage user={currentUser} />
              </DashboardContent>
            </Dashboard>
          ) : (
            <LoginScreen onLogin={() => setCurrentUser({ name: 'Michael'})} />
          )
        }
      </div>
      <div styl={{ backgroundColor: 'lightgray'}}>
        <Footer />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <h1>header</h1>
    </div>
  )
};

const LoginScreen = ({ onLogin }) => {
  return (
    <div>
      <h3>Please Login</h3>
      <button onClick={onLogin}>Login</button>
    </div>
  )
};

const Dashboard = ({ children }) => {
  return (
    <div>
      <h2>The Dashboard</h2>
      {children}
    </div>
  )
};

const DashboardNav = () => {
  return (
    <div>
      <h3>Dashboard Nav</h3>
    </div>
  )
};

const DashboardContent = ({ children }) => {
  return (
    <div>
      <h3>Dashboard Content</h3>
      {children}
    </div>
  )
};

const WelcomMessage = ({ user }) => {
  return (
    <div>
      <p>Welcome {user.name}!</p>
    </div>
  )
};

const Footer = () => {
  return (
    <div style={{ backgroundColor: 'lightgray'}}>
      <h1>Footer</h1>
    </div>
  )
};

export default App;
