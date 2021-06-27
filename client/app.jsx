import React, { lazy, Suspense } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Header } from "./base-components/header";
import { PageWrapper } from "./base-components/page-wrapper";
const CompaniesPage = lazy(() => import("./pages/companies/companies.page"));
const CreateCompanyPage = lazy(() => import("./pages/create-company/create-company.page"));
const CreateEmployeePage = lazy(() => import( "./pages/create-employee/create-employee"));
const EmployeesPage = lazy(() => import("./pages/employees/employees.page"));

export const App = () => (
  <BrowserRouter>
    <Header />
    <PageWrapper>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path="/create-company" component={() => <CreateCompanyPage />} />
          <Route path="/create-employee" component={() => <CreateEmployeePage />} />
          <Route path="/companies/:id" component={() => <EmployeesPage />} />
          <Route path="/companies" component={() => <CompaniesPage />} />
          <Redirect to="/companies" />
        </Switch>
      </Suspense>
    </PageWrapper>
  </BrowserRouter>
);
