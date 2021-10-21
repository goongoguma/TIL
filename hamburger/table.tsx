import { GuidelineContent } from "@/modules/hooks/api/useGuidelines";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { stringifyUrl } from "query-string";

type Props = {
  items: GuidelineContent[];
  pagination: TablePaginationConfig;
};

const columns: ColumnsType<GuidelineContent> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render(text, recode) {
      return (
        <Link href={`/guidelines/${recode.key}`}>
          <a>{text}</a>
        </Link>
      );
    },
  },
  {
    title: "Pages",
    dataIndex: ["brand", "company", "headCount"],
    key: "pages",
  },
  {
    title: "CompanyName",
    dataIndex: ["brand", "company", "name"],
    key: "companyName",
  },
  {
    title: "BrandName",
    dataIndex: ["brand", "title"],
    key: "brandName",
  },
];

const GuidelinesTable: React.VFC<Props> = ({ items, pagination }) => {
  const router = useRouter();

  const handleChange = (nextPagination: TablePaginationConfig) => {
    const newPathname = stringifyUrl(
      {
        url: router.pathname,
        query: { ...router.query, pages: nextPagination.current },
      },
      { skipEmptyString: true, skipNull: true }
    );
    const newAsPath = stringifyUrl(
      {
        url: router.asPath,
        query: { pages: nextPagination.current },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.replace(newPathname, newAsPath);
  };

  return (
    <Table
      columns={columns}
      dataSource={items}
      pagination={pagination}
      onChange={handleChange}
    />
  );
};

export default GuidelinesTable;
