import GuidelineBreadcrumb from "@/components/Guidelines/breadcrumb";
import GuidelinePageTable from "@/components/Guidelines/pageTable";
import {
  GuidelinePageContent,
  useGuideline,
  useGuidelinePage,
} from "@/modules/hooks/api/useGuideline";
import { Button, Form, Input, Layout, PageHeader, Typography } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const UserLayout = styled(Layout)`
  margin: 20px 0;
  padding: 24px;
  background-color: #fff;
`;

const PageTableLayout = styled(Layout)`
  padding: 20px;
`;

const PageTableTitle = styled(Typography)`
  font-size: 15px;
  padding-bottom: 12px;
`;

const GuidelineEdit: React.VFC = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  const { guideline, isLoading } = useGuideline(id as string);
  const { items, totalCount } = useGuidelinePage(id as string, page - 1);
  const route = guideline
    ? { name: guideline.title, url: `/guidelines/${guideline.id}` }
    : undefined;
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (!isLoading) {
      form.setFieldsValue({
        id: guideline?.id,
        title: guideline?.title,
        companyName: guideline?.brand.company.name,
        brandName: guideline?.brand.title,
      });
    }
  }, [isLoading, guideline, form]);

  const getGuidelineTablePageItems = () => {
    return items?.map((item) => ({
      ...item,
      key: item.slug,
    }));
  };
  const guideLinePages = getGuidelineTablePageItems();
  const onChangePage = (pagination: number) => setPage(pagination);
  const onSubmit = (value: {
    id: number;
    title: string;
    companyName: string;
    brandName: string;
  }) => {
    // const updatedValue = {
    //   ...guideline,
    //   brand: {
    //     ...guideline.brand,
    //     company: {
    //       ...guideline.brand.company,
    //       name: value.companyName,
    //     },
    //     title: value.brandName,
    //   },
    //   title: value.title,
    // };
    // updateGuideline(id as string, updatedValue);
    console.log(value);
  };

  return (
    <React.Fragment>
      <GuidelineBreadcrumb route={route} />
      <PageHeader
        ghost={false}
        title="가이드라인 관리 수정"
        onBack={() => router.back()}
      />

      <UserLayout>
        <Form
          form={form}
          name="user-edit"
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item label="번호" name="id" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>

          <Form.Item label="이름" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="회사 이름"
            name="companyName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="브랜드 이름"
            name="brandName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              저장
            </Button>
          </Form.Item>
        </Form>
        <PageTableLayout>
          <PageTableTitle>
            {/* 페이지 목록 (총 페이지 수: {guideline?.pages.total}) */}
          </PageTableTitle>
          <GuidelinePageTable
            items={guideLinePages as GuidelinePageContent[]}
            page={page}
            onChangePage={onChangePage}
            totalCount={totalCount}
          />
        </PageTableLayout>
      </UserLayout>
    </React.Fragment>
  );
};

export default GuidelineEdit;
