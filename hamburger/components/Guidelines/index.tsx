import GuidelineTables from "@/components/Guidelines/table";
import { GuidelineContent } from "@/modules/hooks/api/useGuidelines";
import { TablePaginationConfig } from "antd";
import React from "react";

type Props = {
  data: GuidelineContent[];
  isError: boolean;
  pagination: TablePaginationConfig;
};
const getGuidelinesTableItems = (
  guidelines: GuidelineContent[]
): (GuidelineContent & { key: string })[] => {
  return guidelines.map((guideline) => ({
    ...guideline,
    key: guideline.id.toString(),
  }));
};

const Index: React.VFC<Props> = ({ data, pagination }) => {
  if (data === undefined) {
    return <div>loading...</div>;
  }

  const items = getGuidelinesTableItems(data);
  return (
    <React.Fragment>
      <GuidelineTables items={items} pagination={pagination} />
    </React.Fragment>
  );
};

export default Index;
