import SWRQueryKeys from "@/modules/constants/SWRQueryKeys";
import { getGuideline, getGuidelinePage } from "@/pages/api/guidelines";
import { List, ReturnTypeOfHooks } from "@/types/useSWR";
import useSWR from "swr";
import { GuidelineContent } from "./useGuidelines";

type GuidelinePageCategory = {
  id: number;
  priority: number;
  slug: string;
  title: string;
};

export type GuidelinePageContent = {
  category: GuidelinePageCategory;
  document: GuidelineContent;
  group: GuidelinePageCategory;
  id: number;
  isEnabled: boolean;
  layout: string;
  priority: number;
  scope: string;
  sections: [];
  slug: string;
  title: string;
};

export type GuidelinePage = {
  content: GuidelinePageContent[];
  totalElements: number;
};

export function useGuideline(
  id: string
): ReturnTypeOfHooks<{ guideline: GuidelineContent }> {
  const { data, error } = useSWR<GuidelineContent>(
    [id, SWRQueryKeys.getGuideline],
    getGuideline
  );

  return {
    guideline: data as GuidelineContent,
    isLoading: !error && !data,
    isError: Boolean(error),
  };
}

export function useGuidelinePage(
  id: string,
  page: number,
  size = 5
): ReturnTypeOfHooks<List<GuidelinePageContent>> {
  const { data, error } = useSWR<GuidelinePage>(
    [id, page, size, SWRQueryKeys.getGuidelinePage],
    getGuidelinePage
  );

  return {
    items: data?.content as GuidelinePageContent[],
    isLoading: !error && !data,
    isError: Boolean(error),
    totalCount: data?.totalElements as number,
  };
}
