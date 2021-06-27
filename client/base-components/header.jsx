import { Row, Col, Menu } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Menu as Icon } from "../assets/icons/menu";

export const HeaderWrapper = styled(Row)`
  && {
    background: ${(props) => props.theme.palette.primary.dark};
    height: 190px;
    padding: 16px;
  }
`;
export const MenuIcon = styled(Icon)`
  && {
    :hover {
      cursor: pointer;
    }
  }
`;

const headerItems = [
  {
    key: '/companies',
    label: 'Companhias',
    to: '/companies'
  },
  {
    key: '/create-company',
    label: 'Cadastrar companhia',
    to: '/create-company'
  },
  {
    key: '/create-employee',
    label: 'Cadastrar Colaborador',
    to: '/create-employee'
  }
]

export const Header = () => { 
  const history = useHistory();

  return (
    <HeaderWrapper> 
      <Col>
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={[history.location.pathname]}  >
          {headerItems.map(headerItem => 
            <Menu.Item key={headerItem.key} onClick={() => history.push(headerItem.to)}>
              {headerItem.label}
            </Menu.Item>
          )}
        </Menu>
      </Col>
    </HeaderWrapper>
  )
};
