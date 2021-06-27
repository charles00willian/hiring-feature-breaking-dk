import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button } from "../../base-components/button";
import { PageTitle } from "../../base-components/page-title";
import { Row, Col, message } from "antd";
import {  GET_EMPLOYEES_BY_ID } from "../../graphql/queries";
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
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
  },
  {
    title: "Telefone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Benefícios",
    dataIndex: "benefits",
    key: "benefits",
    render: (benefits) => <>{benefits.join(", ")}</>,
  },
];

const EmployeesPage = () => {
  const history = useHistory(); 
  const params = useParams();

  const { loading, data: employeeData } = useQuery(
    GET_EMPLOYEES_BY_ID,
    {
      variables: {
        id: params.id,
      },
      onError: (err) => message.error(err.message),
    }
  );

  const handleCreateCompany = (_event) => {
    history.push(`/create-employee`);
  };

  return (
    <>
      <Row align="middle" gutter={[0, 24]}>
        <Col>
          <PageTitle>Colaboradores</PageTitle>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleCreateCompany}
            color="secondary"
          >
            Criar colaborador
          </Button>
        </Col>
        <Col span={24}>
          <DefaultTable
            loading={loading}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={employeeData?.findEmployeeByCompanyId || []}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmployeesPage