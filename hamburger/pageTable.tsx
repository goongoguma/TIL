import { GuidelinePageContent } from "@/modules/hooks/api/useGuideline";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import React from "react";

type Props = {
  items: GuidelinePageContent[];
  page: number;
  onChangePage: (page: number) => void;
  totalCount: number;
};

const columns: ColumnsType<GuidelinePageContent> = [
  {
    title: "Name",
    dataIndex: "title",
    key: "name",
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
  },
  {
    title: "Scope",
    dataIndex: "scope",
    key: "scope",
  },
];

const GuidelinePageTable: React.VFC<Props> = ({
  items,
  page,
  onChangePage,
  totalCount,
}) => {
  const pagination = {
    defaultCurrent: page,
    defaultPageSize: 5,
    showSizeChanger: false,
    total: totalCount,
  };
  const handleChange = (pagination: TablePaginationConfig) =>
    onChangePage(pagination.current as number);

  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={pagination}
      onChange={handleChange}
    />
  );
};

export default GuidelinePageTable;
