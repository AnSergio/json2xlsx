import { utils, write } from "xlsx";
import { open, save } from "@tauri-apps/api/dialog";
import { readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";

export type ProdutosType = {
  codigo: string;
  nome: string;
  valor: number;
  quantidade: number;
};

const filters = [
  { name: "Excel Workbook", extensions: ["xlsx"] },
  { name: "Excel 97-2004 Workbook", extensions: ["xls"] },
];

const onWch = (Item: ProdutosType[]) => {
  return Object.keys(Item[0]).map((m) => {
    const len = m.length < 9 ? 10 : m.length + 1;
    return { wch: len };
  });
};

export const PriUpperCase = (Item: string) => {
  if (Item) return Item.toLowerCase().replace(/(?:^|\s)\S/g, (i: string) => i.toUpperCase());
  else return Item;
};

export const onLeituraJson = async () => {
  const selec = String(await open({ multiple: false, filters: [{ name: "*.*", extensions: ["json"] }] }));
  if (selec != "null") {
    const onReadBi = await readBinaryFile(selec);
    const onJson: any = new TextDecoder("utf-8").decode(onReadBi);
    const readJson: ProdutosType[] = JSON.parse(onJson);
    return readJson;
  } else {
    return [];
  }
};

export const onSalvarXLSX = async (List: ProdutosType[]) => {
  const Sheet = utils.json_to_sheet(List);
  const Book = utils.book_new();

  Sheet["!cols"] = onWch(List);
  utils.book_append_sheet(Book, Sheet, "Produtos");

  const local = await save({ defaultPath: "Produtos", filters });
  if (!local) return;
  const bookType: any | undefined = local?.slice(local.lastIndexOf(".") + 1);
  const u8Array = write(Book, { bookType, type: "buffer" });
  await writeBinaryFile(local, u8Array).finally(async () => console.log("Salvo"));
};
