import React, { useState, useContext } from 'react';
import './App.css';

const Context = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
      <div>
        <Context.Provider value={{ currentUser }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{ backgroundColor: 'lightgray'}}>
              <Header />
            </div>
            <div style={{flex: 1}}>
              {
                currentUser ? (
                  <Dashboard />
                ) : (
                  <LoginScreen onLogin={() => setCurrentUser({ name: 'Michael'})} />
                )
              }
            </div>
            <div styl={{ backgroundColor: 'lightgray'}}>
              <Footer />
            </div>
          </div>
        </Context.Provider>
        <WelcomMessage />
      </div>
  );
};

const Header = () => {
  return (
    <div>
       <WelcomMessage />
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

const Dashboard = () => {
  return (
    <div>
      <h2>The Dashboard</h2>
      <DashboardNav />
      <DashboardContent />
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

const DashboardContent = () => {
  return (
    <div>
      <h3>Dashboard Content</h3>
      <WelcomMessage />
    </div>
  )
};

const WelcomMessage = () => {
  let { currentUser } = useContext(Context)
  return (
    <div>
      <p>Welcome {currentUser ? currentUser.name : '...'}!</p>
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
