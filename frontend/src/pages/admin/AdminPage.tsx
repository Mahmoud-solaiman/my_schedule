import { Header } from "../../components/Header";
import { SidePanel } from "../../components/SidePanel";
import './AdminPage.scss';

export function AdminPage() {
  return (
    <div className="admin-page-container">
      <SidePanel />
      <section className="routes-container">
        <Header />
      </section>
    </div>
  );
}