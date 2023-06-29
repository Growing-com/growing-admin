import dayjs from "dayjs";
import * as xlsx from "xlsx";

const EXCEL_HEADER = ["코디", "순장", "이름", "학년", "성별"];

export const ExportExcelOfJson = async <ExcelDataType>(
  data: ExcelDataType[],
  renderCell?: () => void
) => {
  return await new Promise((resolve, reject) => {
    try {
      if (!data.length) reject(new Error("Data Empty"));

      const worksheet = xlsx.utils.json_to_sheet<ExcelDataType>(data);
      // excel 헤더 값 변경
      EXCEL_HEADER.forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
        worksheet[cellAdd].v = x;
      });

      // url 위치 찾아서 hyperlink 로 변경해 주기
      // const urlIndex = EXCEL_HEADER.findIndex(
      //   headerTitle => headerTitle === "URL"
      // );
      // for (let col = 1; col < data.length; col++) {
      //   const cell = xlsx.utils.encode_cell({ c: urlIndex, r: col });
      //   if (data[col]?.url) {
      //     worksheet[cell].l = { Target: data[col].url };
      //   }
      // }

      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const today = dayjs().format("YYYY-MM-DD_HH-mm-ss");
      xlsx.writeFile(workbook, `출석 정보_${today}.xlsx`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
