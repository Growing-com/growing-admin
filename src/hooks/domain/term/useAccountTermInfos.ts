// import { tOptions } from "@component/atom/dataEntry/type";
// import { useTermCodyQuery } from "apiV1_prefix/term/queries/useTermCodyQuery";
// import { useEffect, useState } from "react";

// const useAccountTermInfos = () => {
//   const [cordiSelectItem, setCordiSelectItem] = useState<tOptions[]>([]);

//   const { data: cordiList, isSuccess } = useTermCodyQuery({ termId: 1 });

//   useEffect(() => {
//     if (isSuccess && cordiList?.length) {
//       const _selectItem = cordiList.map(cordi => ({
//         value: cordi.userId,
//         label: cordi.name
//       }));
//       setCordiSelectItem(_selectItem);
//     }
//   }, [cordiList, isSuccess]);

//   return {
//     cordiSelectItem
//   };
// };

// export default useAccountTermInfos;
