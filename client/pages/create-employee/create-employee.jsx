import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Select, Divider, Row, Col, message, Card, Spin } from "antd";
import { Button } from "../../base-components/button";
import { PageTitle } from "../../base-components/page-title";
import { CREATE_EMPLOYEE } from "../../graphql/mutations";
import constants from "../../shared/constants";
import { GET_ALL_COMPANIES } from "../../graphql/queries";

const { benefits } = constants;


export const CreateEmployeePage = () => {
  const [form] = Form.useForm();

  const [createEmployee, { loading: creating }] = useMutation(CREATE_EMPLOYEE);

  const { loading: companiesLoading, data: companiesData } = useQuery(
    GET_ALL_COMPANIES,
    {
      onError: (err) => message.error(err.message),
      
    }
  );
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if(companiesData?.getAllCompanies){
      setOptions(companiesData.getAllCompanies.map(company => ({
        value: company.id,
        label: company.name,
      })))
    }
  }, [companiesData])

  const handleSubmit = async (values) => {
    try {
      await createEmployee({ variables: values });
      form.resetFields();
      message.success("Colaborador criado com sucesso!");
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <>
      <Row justify="flex-start" align="middle" gutter={[0, 24]}>
        <Col>
          <PageTitle>Novo colaborador</PageTitle>
        </Col>
        <Col span={24}>
          <Card>
            <Row justify="flex-start">
              <Col xs={24} sm={18} md={18} lg={12} xl={12}>
                <Form onFinish={handleSubmit} form={form} layout="vertical">
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="CPF"
                    name="cpf"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item
                    label="Endereço"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Telefone"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Empresas"
                    name="companies"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >


                     <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Selecionar"
                      options={options}
                      notFoundContent={companiesLoading ? <Spin size="small" /> : null}
                    />
                    
                  </Form.Item>
                  <Form.Item
                    label="Benefícios"
                    name="benefits"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Selecionar"
                      options={benefits}
                    />
                  </Form.Item>
                  <Divider />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      color="secondary"
                      loading={creating}
                    >
                      Criar colaborador
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};
