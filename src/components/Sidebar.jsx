import { LayoutDashboard, LogOut, Package, Settings, Truck } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Tracking', icon: Truck },
  { label: 'Shipments', icon: Package },
  { label: 'Settings', icon: Settings }
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="https://primaconsulting.org/wp-content/uploads/2024/04/prima-management-logo.svg" alt="ShipHub"/>
        <div>
          <h3>Logistics</h3>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button className={item.active ? 'nav-item active' : 'nav-item'} key={item.label}>
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="nav-item logout">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
