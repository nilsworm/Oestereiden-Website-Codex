import { Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { DepartmentPage } from './pages/DepartmentPage';
import { HallPage } from './pages/HallPage';
import { HomePage } from './pages/HomePage';
import { ImprintPage, PrivacyPage } from './pages/LegalPages';
import { MembershipPage } from './pages/MembershipPage';

export function App() {
  return <AppShell><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/fussball" element={<DepartmentPage />} />
    <Route path="/volleyball" element={<DepartmentPage />} />
    <Route path="/tennis" element={<DepartmentPage />} />
    <Route path="/breitensport" element={<DepartmentPage />} />
    <Route path="/hallenbelegung" element={<HallPage />} />
    <Route path="/mitgliedschaft" element={<MembershipPage />} />
    <Route path="/impressum" element={<ImprintPage />} />
    <Route path="/datenschutz" element={<PrivacyPage />} />
    <Route path="*" element={<HomePage />} />
  </Routes></AppShell>;
}
