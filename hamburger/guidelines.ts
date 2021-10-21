import { GuidelinePage } from "@/modules/hooks/api/useGuideline";
import { Guideline, GuidelineContent } from "@/modules/hooks/api/useGuidelines";
import { get, post } from "@/modules/libs/axiosInstance";

export async function getGuidelineList(
  page: number,
  filter: string
): Promise<Guideline> {
  return await get(`/admin/api/document`, {
    params: { page, size: 10, filter },
  });
}

export async function getGuideline(id: string): Promise<GuidelineContent> {
  return await get(`/admin/api/document/${id}`);
}

export async function getGuidelinePage(
  id: string,
  page: number
): Promise<GuidelinePage> {
  return await get(`/admin/api/document/${id}/page`, {
    params: { page, size: 5 },
  });
}

export async function updateGuideline(
  id: string,
  value: unknown
): Promise<unknown> {
  return await post(`/admin/api/document/${id}`, value);
}
