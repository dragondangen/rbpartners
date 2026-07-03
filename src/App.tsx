import { Routes, Route, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GenericPage from "./pages/GenericPage";
import Services from "./pages/Services";
import Deals from "./pages/Deals";
import DealDetail from "./pages/DealDetail";
import Team from "./pages/Team";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

function PageBySlug() {
  const { slug = "" } = useParams();
  return <GenericPage slug={slug} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<GenericPage slug="about-us" />} />
        <Route path="services" element={<Services />} />
        <Route path="globalscope" element={<GenericPage slug="globalscope" />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="team" element={<Team />} />
        <Route path="deals" element={<Deals />} />
        <Route path="deals/:slug" element={<DealDetail />} />
        <Route path="page/:slug" element={<PageBySlug />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
