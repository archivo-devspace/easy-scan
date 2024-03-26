export interface ReqItem {
    itemTitle: string;
    itemDesc: string;
    itemCoverImg: File | null;
  }

export interface ResItem {
  id: string,
  itemTitle: string;
  itemDesc: string;
  itemCoverImg: string;
}