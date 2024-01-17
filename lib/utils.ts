import { type ClassValue, clsx }        from "clsx"
import { twMerge }                      from "tailwind-merge"
import { formatDistanceToNow }          from "date-fns"
import { IHasRank, ISortablePayload }   from "@/types"
import { IIssue }                       from "@/database/issue.model"

import { LexoRank }                     from "lexorank"
import { DragUpdate }                   from "react-beautiful-dnd"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const getTimestamp = (createdAt: Date): string => {
  return formatDistanceToNow(createdAt, { addSuffix: true })
}
export const formatBigNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(2);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(2);
    return `${formattedNum}K`;
  }
  return num.toString();
};

export function sortByLexoRankAsc(a: IHasRank, b: IHasRank): number {
  if (!a.rank && b.rank) {
    return -1;
  }
  if (a.rank && !b.rank) {
    return 1;
  }

  if (!a.rank || !b.rank) {
    return 0;
  }

  return a.rank.localeCompare(b.rank);
};

// export function createSortablePayloadByIndex<TEntity extends IId & IHasRank>(items: TEntity[], event: DragUpdate): ISortablePayload<TEntity> {
export function createSortablePayloadByIndex(items: IIssue[], event: DragUpdate): ISortablePayload<IIssue> {
  const { draggableId, destination } = event

  const colItems = items.filter(item => item.status === destination?.droppableId)
    .filter(item => item._id !== draggableId)

  let prevEntity, nextEntity

  const entity = items.find(item => item._id === draggableId)

  for (const [i] of colItems.entries()) {
    if (i === destination?.index) {
      nextEntity = colItems[i]
      break
    }
    prevEntity = colItems[i]
  }

  return { prevEntity, entity, nextEntity }
}

export function getBetweenRankAsc(payload: ISortablePayload<IIssue>): LexoRank {
  const {prevEntity, entity, nextEntity} = payload
  let newLexoRank: LexoRank
  if (!prevEntity && !!nextEntity) {
    console.log('genPrev', LexoRank.parse(nextEntity.rank).genPrev())
    newLexoRank = LexoRank.parse(nextEntity.rank).genPrev()
  } else if (!nextEntity && !!prevEntity) {
    console.log('genNext', LexoRank.parse(prevEntity.rank).genNext)
    newLexoRank = LexoRank.parse(prevEntity.rank).genNext()
  } else if (!!prevEntity && !!nextEntity) {
    console.log('genBetween', LexoRank.parse(nextEntity.rank).between(LexoRank.parse(prevEntity.rank)))
    newLexoRank = LexoRank.parse(nextEntity.rank).between(LexoRank.parse(prevEntity.rank))
  } else {
    const entityRank = entity?.rank || ''
    newLexoRank = LexoRank.parse(entityRank).genNext()
  }

  return newLexoRank
}

export function pluralize(count: number, noun: string, suffix = 's') {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`
}
