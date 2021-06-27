import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button } from "../../base-components/button";
import { PageTitle } from "../../base-components/page-title";
import { Row, Col, message } from "antd";
import { GET_ALL_COMPANIES } from "../../graphql/queries";
import { DefaultTable } from "../../base-components/default-table";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Nome fantasia",
    dataIndex: "tradingName",
    key: "tradingName",
  },
  {
    title: "CNPJ",
    dataIndex: "cnpj",
    key: "cnpj",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Benefícios",
    dataIndex: "chosenBenefits",
    key: "chosenBenefits",
    render: (benefits) => <>{benefits.join(", ")}</>,
  },
];

const CompaniesPage = () => {
  const history = useHistory();

  const { loading: companiesLoading, data: companiesData } = useQuery(
    GET_ALL_COMPANIES,
    {
      onError: (err) => message.error(err.message),
    }
  );

  const handleRowClick = (record) => (_event) => {
    history.push(`/companies/${record.id}`);
  };

  const handleRow = (record) => {
    return {
      onClick: handleRowClick(record),
    };
  };

  const handleCreateCompany = (_event) => {
    history.push(`/create-company`);
  };

  return (
    <>
      <Row align="middle" gutter={[0, 24]}>
        <Col>
          <PageTitle>Empresas</PageTitle>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleCreateCompany}
            color="secondary"
          >
            Criar empresa
          </Button>
        </Col>
        <Col span={24}>
          <DefaultTable
            loading={companiesLoading}
            pagination={{ pageSize: 6 }}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={companiesData?.getAllCompanies ?? []}
            onRow={handleRow}
          />
        </Col>
      </Row>
    </>
  );
};

export default CompaniesPage;