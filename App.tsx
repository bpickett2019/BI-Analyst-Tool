import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "./pages/Dashboard";
import Dashboards from "./pages/Dashboards";
import CreateDashboardNew from "./pages/CreateDashboardNew";
import Home from "./pages/Home";
import Pipelines from "./pages/Pipelines";
import SQLMode from "./pages/SQLMode";
import DataExplorer from "./pages/DataExplorer";
import Integrations from "./pages/Integrations";
import DataModels from "./pages/DataModels";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import ModernLayout from "./layouts/ModernLayout";
import AppLayout from "./layouts/AppLayout";
import SalesDashboard from "./pages/SalesDashboard";
import MarketingDashboard from "./pages/MarketingDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import EcommerceDashboard from "./pages/EcommerceDashboard";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import WebsiteDashboard from "./pages/WebsiteDashboard";
import HRDashboard from "./pages/HRDashboard";
import OperationsDashboard from "./pages/OperationsDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import InventoryDashboard from "./pages/InventoryDashboard";
import SupportDashboard from "./pages/SupportDashboard";
import SaaSDashboard from "./pages/SaaSDashboard";
import SocialDashboard from "./pages/SocialDashboard";
import ProductDashboard from "./pages/ProductDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboards" component={Dashboards} />
      <Route path="/pipelines" component={Pipelines} />
      <Route path="/sql-mode" component={SQLMode} />
      <Route path="/data-explorer" component={DataExplorer} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/models" component={DataModels} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/settings" component={Settings} />
      {/* Dashboard Templates */}
      <Route path="/dashboard/sales" component={SalesDashboard} />
      <Route path="/dashboard/marketing" component={MarketingDashboard} />
      <Route path="/dashboard/customer" component={CustomerDashboard} />
      <Route path="/dashboard/finance" component={FinanceDashboard} />
      <Route path="/dashboard/ecommerce" component={EcommerceDashboard} />
      <Route path="/dashboard/projects" component={ProjectsDashboard} />
      <Route path="/dashboard/website" component={WebsiteDashboard} />
      <Route path="/dashboard/hr" component={HRDashboard} />
      <Route path="/dashboard/operations" component={OperationsDashboard} />
      <Route path="/dashboard/executive" component={ExecutiveDashboard} />
      <Route path="/dashboard/inventory" component={InventoryDashboard} />
      <Route path="/dashboard/support" component={SupportDashboard} />
      <Route path="/dashboard/saas" component={SaaSDashboard} />
      <Route path="/dashboard/social" component={SocialDashboard} />
      <Route path="/dashboard/product" component={ProductDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/create-dashboard">
          <CreateDashboardNew />
        </Route>
        <Route>
          <ModernLayout>
            <Router />
          </ModernLayout>
        </Route>
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
