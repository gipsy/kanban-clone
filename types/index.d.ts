import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface IId {
  draggableId: UniqueIdentifier;
}

export interface IHasRank {
  rank: string;
}

export interface IListItemData extends IId, IHasRank {
  name: string;
}

export interface ISortablePayload<TEntity extends IId> {
  prevEntity?: TEntity;
  entity: TEntity;
  nextEntity?: TEntity;
}
