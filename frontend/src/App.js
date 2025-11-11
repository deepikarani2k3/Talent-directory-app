import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TalentForm from './components/TalentForm';
import SkillFilter from './components/SkillFilter';
import TalentList from './components/TalentList';
import './styles/App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1>💼 Talent Directory</h1>
            <p>Manage and discover talented professionals</p>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <div className="content-wrapper">
              <section className="form-section">
                <TalentForm />
              </section>

              <section className="filter-section">
                <SkillFilter />
              </section>

              <section className="list-section">
                <TalentList />
              </section>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 Talent Directory. All rights reserved.</p>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
