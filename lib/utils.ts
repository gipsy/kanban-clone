import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"
import {IHasRank, IId, IistItemData, ISortablePayload} from "@/types"

import {LexoRank} from "lexorank"
import { DragUpdate } from "react-beautiful-dnd"

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

export function createSortablePayloadByIndex<TEntity extends IId & IHasRank>(items: TEntity[], event: DragUpdate): ISortablePayload<TEntity> {
  const { draggableId, source, destination } = event

  const oldIndex = source.index
  const newIndex = destination?.index
  const colItems = items.filter(item => item.status === destination?.droppableId)
    .filter(item => item._id !== draggableId)

  let prevEntity, nextEntity
  // const entity = items[oldIndex]
  const entity = items.find(item => item._id === draggableId)
  // if (destination?.index === 0) {
  //   entity = items[0]
  // } 
  for (const [i, item] of colItems.entries()) {
    if (i === destination?.index) {
      nextEntity = colItems[i]
      break
    }
    prevEntity = colItems[i]
  }
  // if (prevEntity?.draggableId === entity?.draggableId) {
  //   prevEntity = nextEntity
  //   nextEntity = undefined
  // }

  console.log('prevEntity', prevEntity)
  console.log('nextEntity', nextEntity)
  console.log('entity', entity)

  return { prevEntity, entity, nextEntity }

  let input: ISortablePayload<TEntity>
  // const entity = items[oldIndex]
  // const entity = items.find(item => item._id === draggableId)
  console.log('ENTITY', entity)
  // if (source.droppableId !== destination?.droppableId ) {
  //   console.log('DESTINATION.droppableId', destination?.droppableId)
  //   entity.status = destination?.droppableId
  // }

  // if (newIndex === 0) {
  //   const nextEntity = items[newIndex]
  //   input = {prevEntity: undefined, entity: entity, nextEntity: nextEntity} as ISortablePayload<TEntity>
  // } else if (newIndex === items.length - 1) {
  //   const prevEntity = items[newIndex]
  //   input = {prevEntity: prevEntity, entity: entity, nextEntity: undefined} as ISortablePayload<TEntity>
  // } else {
  //   const prevEntity = items[newIndex]
  //   const offset = oldIndex > newIndex ? -1 : 1
  //   console.log('OFFSET', offset)
  //   const nextEntity = items[newIndex + offset]
  //   input = {prevEntity: prevEntity, entity: entity, nextEntity: nextEntity} as ISortablePayload<TEntity>
  // }

  // return input
}

export function getBetweenRankAsc<TEntity extends IId & IHasRank>(payload: ISortablePayload<TEntity>): LexoRank {
  console.log('getBetweenRankAsc', payload)
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
    newLexoRank = LexoRank.parse(entity.rank).genNext()
  }

  // console.log('newLexoRank', newLexoRank)

  return newLexoRank
}

