import "./sidebar.css";

export interface SidebarProps {
  title: string;
}

const SidebarRow: React.FC<SidebarProps> = ({ title }) => {
  return (
    <div className="sidebar__row">
      <p className="sidebar__row-title">{title}</p>
    </div>
  );
};

export default SidebarRow;
