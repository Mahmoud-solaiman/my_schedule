import { Route, Routes } from "react-router-dom";
import { Header } from "../../components/Header";
import { SidePanel } from "../../components/SidePanel";
import './AdminPage.scss';
import { Dashboard } from "./dashboard/Dashboard";

export function AdminPage() {
  return (
    <div className="admin-page-container">
      <SidePanel />
      <section className="routes-container">
        <Header />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </section>
    </div>
  );
}