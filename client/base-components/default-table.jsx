import styled from "styled-components";
import { Table } from "antd";

export const DefaultTable = styled(Table)`
  && {
    border-radius: 2px;
    padding: 16px;
    background: white;
    width: 100%;
    tbody tr:hover {
      cursor: pointer;
    }
  }
`;
