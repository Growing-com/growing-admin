import { useQueryClient } from "@tanstack/react-query";

export const useAttendances = () => {
  const queryClient = useQueryClient();

  //   return useQuery([querykeys.MORTGAGE_INQUIRE_RESULT], () => getLoanInquiryResult(transactionId), {
  //     onSuccess: data => {
  //       // if (!data.interestRate1000 || !data.loanLimitAmount) {
  //       //   queryClient.invalidateQueries([querykeys.MORTGAGE_INQUIRE_RESULT]);
  //       // }
  //     },
  //     enable: Boolean(transactionId),
  //     refetchInterval: (data, query) => {
  //       return !data ? 1000 : false;
  //     },
  //   });
};
