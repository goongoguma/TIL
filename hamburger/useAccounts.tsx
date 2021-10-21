import { getAccountList } from "@/modules/apis/account";
import SWRQueryKeys from "@/modules/constants/SWRQueryKeys";
import type { Account } from "@/types/accounts";
import type { List, ReturnTypeOfHooks } from "@/types/useSWR";
import useSWR from "swr";

export function useAccounts(
  pages: number,
  filter: string
): ReturnTypeOfHooks<Partial<List<Account>>> {
  const { data, error } = useSWR<Account[]>(
    [pages, filter, SWRQueryKeys.getAccountList],
    getAccountList
  );

  return {
    items: data,
    isLoading: !error && !data,
    isError: Boolean(error),
    totalCount: 100,
  };
}
