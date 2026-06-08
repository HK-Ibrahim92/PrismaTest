import { Bell, Search } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <div>
        <h1>Dashboard</h1>
        <p>Track current shipping activity and delivery progress.</p>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={17} />
          <span>Search shipments</span>
        </div>
        <button className="icon-button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="profile">
          <div className="avatar">IB</div>
          <div>
            <strong>Ibrahim</strong>
            <small>Admin</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
