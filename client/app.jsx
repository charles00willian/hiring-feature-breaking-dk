import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Header } from "./base-components/header";
import { PageWrapper } from "./base-components/page-wrapper";
import { CompaniesPage } from "./pages/companies/companies.page";
import { CreateCompanyPage } from "./pages/create-company/create-company.page";
import { CreateEmployeePage } from "./pages/create-employee/create-employee";
import { EmployeesPage } from "./pages/employees/employees.page";

export const App = () => (
  <BrowserRouter>
    <Header />
    <PageWrapper>
      <Switch>
        <Route path="/create-company" component={() => <CreateCompanyPage />} />
        <Route path="/create-employee" component={() => <CreateEmployeePage />} />
        <Route path="/companies/:id" component={() => <EmployeesPage />} />
        <Route path="/companies" component={() => <CompaniesPage />} />
        <Redirect to="/companies" />
      </Switch>
    </PageWrapper>
  </BrowserRouter>
);
