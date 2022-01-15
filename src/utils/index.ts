import { format, parseISO } from "date-fns";

const DATE_SEPARATOR = "&date=";

export const getDocumentId = (userId: string | undefined = "") => {
  return `${userId}${DATE_SEPARATOR}${new Date().toISOString().slice(0, 10)}`;
};

export const findTimeEntry = (docObj: any) => {
  if (docObj?.start1 && docObj?.end1 && docObj?.start2 && !docObj?.end2) {
    return "end2";
  }

  if (docObj?.start1 && docObj?.end1 && !docObj?.start2 && !docObj?.end2) {
    return "start2";
  }

  if (docObj?.start1 && !docObj?.end1 && !docObj?.start2 && !docObj?.end2) {
    return "end1";
  }

  if (!docObj?.start1 && !docObj?.end1 && !docObj?.start2 && !docObj?.end2) {
    return "start1";
  }

  return "ALL_FILLED";
};

export const getFormattedDateFromDocId = (
  id: string,
  format: string = "dd/MM/yyyy"
) => {
  const onlyDate = id.slice(id.indexOf(DATE_SEPARATOR) + DATE_SEPARATOR.length);

  return onlyDate;
};

export const getTimeFromISO = (s: string) =>
  s ? s.slice(s.indexOf("T") + 1, s.length - 5) : "-";
