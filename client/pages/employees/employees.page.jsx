import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button } from "../../base-components/button";
import { PageTitle } from "../../base-components/page-title";
import { Row, Col, message } from "antd";
import {  GET_EMPLOYEES_BY_COMPANY_ID } from "../../graphql/queries";
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

const limit = 5;

const EmployeesPage = () => {
  const history = useHistory(); 
  const params = useParams();

  const [offset, setOffset] = useState(0)

  const { loading, data: employeeData } = useQuery(
    GET_EMPLOYEES_BY_COMPANY_ID,
    {
      variables: {
        id: params.id,
        limit: limit,
        offset,
      },
      onError: (err) => message.error(err.message),
    }
  );

  console.log(employeeData)

  const handleCreateCompany = (_event) => {
    history.push(`/create-employee`);
  };

  const onChangePage = (pagination) => {
    setOffset((pagination.current - 1) * limit)
  }

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
            pagination={{ 
              pageSize: limit, 
              total: employeeData?.findEmployeeByCompanyId?.pagination.totalElements  
            }}
            columns={columns}
            onChange={onChangePage}
            dataSource={employeeData?.findEmployeeByCompanyId?.nodes || []}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmployeesPage