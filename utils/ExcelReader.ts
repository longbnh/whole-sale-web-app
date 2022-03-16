import ExcelJS from "exceljs";
import IExcelData from "../shared/models/IExcelData";

const ExcelReader = (
  file: File,
  setData: React.Dispatch<React.SetStateAction<IExcelData[]>>
) => {
  const wb = new ExcelJS.Workbook();
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  let data: IExcelData[] = [];

  reader.onload = () => {
    const buffer: any = reader.result;
    wb.xlsx
      .load(buffer)
      .then((workbook) => {
        const sheet = workbook.getWorksheet("Products");
        for (let i = 2; i < sheet.rowCount; i++) {
          if (sheet.getRow(i).actualCellCount > 1) {
            let temp: any = sheet.getRow(i).values;
            temp.shift();
            let excelObject: IExcelData = {
              id: i - 1,
              name: temp[1],
              category: temp[2],
              subcategory: temp[3],
              origin: temp[4],
              brand: temp[5],
              price: temp[6],
              des: temp[7],
            };
            data.push(excelObject);
          }
        }
      })
      .then(() => setData(data))
      .catch((er) => console.log((er as Error).message));
  };
};

export default ExcelReader;
