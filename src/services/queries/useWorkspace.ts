import { getWorkspace } from '@/apis/workspace';
import { useQuery } from '@tanstack/react-query';




export const useFetchWorkspace = () => {
  return useQuery({
    queryKey: ['fetchTransactionsStatistics'],
    queryFn: getWorkspace,
    refetchOnMount: 'always',
  });
};
