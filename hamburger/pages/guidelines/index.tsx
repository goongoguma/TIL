import Index from "@/components/Guidelines";
import GuidelinesBreadcrumb from "@/components/Guidelines/breadcrumb";
import GuidelinesFilter from "@/components/Guidelines/filter";
import {
  GuidelineContent,
  useGuidelines,
} from "@/modules/hooks/api/useGuidelines";
import getPagination from "@/modules/libs/getPagination";
import getQueryString from "@/modules/libs/getQueryString";
import { PageHeader } from "antd";
import Layout from "antd/lib/layout/layout";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const GuidelinesLayout = styled(Layout)`
  margin: 20px 0;
`;

const GuidelinesHeader = styled(PageHeader)`
  & .ant-page-header-content {
    display: flex;
    justify-content: flex-end;
  }
`;

const Guidelines: React.VFC = () => {
  const router = useRouter();
  const page = parseInt(getQueryString(router.query.pages) ?? "1", 10);
  const filter = getQueryString(router.query.filter) ?? "";
  const { items: guidelines, isLoading, isError, totalCount } = useGuidelines(
    page - 1,
    filter
  );
  const pagination = getPagination({ total: totalCount, current: page });

  return (
    <React.Fragment>
      <GuidelinesBreadcrumb />
      <GuidelinesHeader ghost={false} title="가이드라인 관리">
        <GuidelinesFilter />
      </GuidelinesHeader>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <GuidelinesLayout>
          <Index
            data={guidelines as GuidelineContent[]}
            pagination={pagination}
            isError={isError}
          />
        </GuidelinesLayout>
      )}
    </React.Fragment>
  );
};

export default Guidelines;
