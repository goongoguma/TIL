import SWRQueryKeys from "@/modules/constants/SWRQueryKeys";
import { getGuidelineList } from "@/pages/api/guidelines";
import { List, ReturnTypeOfHooks } from "@/types/useSWR";
import useSWR from "swr";

export type GuidelineBrandCompany = {
  address: string;
  category: null;
  color: null;
  headCount: null;
  id: number;
  logoImage: string;
  name: string;
  purpose: null;
  tenantId: number;
  url: string;
};

export type GuidelineBrand = {
  favicon: string;
  id: number;
  lastModifiedDate: string;
  logoImage: string | null;
  mainImage: string | null;
  primaryColor: string | null;
  slug: string;
  title: string;
  company: GuidelineBrandCompany;
};

export type GuidelineContent = {
  id: number;
  indexPageSlug: string;
  logoImage: string;
  slug: string;
  title: string;
  titleImage: string | null;
  styles: Record<string, unknown>;
  brand: GuidelineBrand;
  key?: string;
};

export type Guideline = {
  content: GuidelineContent[];
  totalElements: number;
};

export function useGuidelines(
  page: number,
  filter: string
): ReturnTypeOfHooks<List<GuidelineContent>> {
  const { data, error } = useSWR<Guideline>(
    [page, filter, SWRQueryKeys.getGuidelineList],
    getGuidelineList
  );

  return {
    items: data?.content as GuidelineContent[],
    isLoading: !error && !data,
    isError: Boolean(error),
    totalCount: data?.totalElements as number,
  };
}
