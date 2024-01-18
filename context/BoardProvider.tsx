"use client"

import React, { createContext, useContext,
    useReducer, Dispatch, Reducer }        from "react"

import { IIssue }       from "@/database/issue.model"
import { TEntity } from "@/types"

export enum ActionKind {
  addIssueAction       = 'ADD_ISSUE',
  updateIssueAction    = 'UPDATE_ISSUE',
  deleteIssueAction    = 'DELETE_ISSUE',
  setEditedIssueAction = 'SET_EDITED_ISSUE',
  setIssuesAction      = 'SET_ISSUES',
  filterIssuesAction   = 'FILTER_ISSUES',
  sortIssuesAction     = 'SORT_ISSUES',
}

type Action = {
  type: ActionKind,
  payload: {
    _id?: string,
    issue?: IIssue,
    issues: IIssue[]
  }
}

type State = {
  issues: IIssue[] | any[];
  currentIssue?: IIssue | TEntity;
}

interface BoardContextType {
   state: State;
  dispatch: Dispatch<any>;
}

export const initialState: State = {
  issues: [],
  currentIssue: {
    title: '',
    status: '',
    description: '',
    rank: '',
    boardId: '',
  }
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionKind.addIssueAction:
      return { ...state, issues: [...state.issues, action.payload] }

    case ActionKind.updateIssueAction:
      const updatedIssues = state.issues.map((issue) => 
        issue._id === action.payload._id ? action.payload : issue)
      return { ...state, issues: updatedIssues }

    case ActionKind.deleteIssueAction:
      const { _id } = action.payload
      return { ...state, issues: state.issues.filter((issue) => 
        issue._id !== _id)
      }

    case ActionKind.setEditedIssueAction:
      const { issue } = action.payload
      return { ...state, currentIssue: issue }

    case ActionKind.setIssuesAction:
      const fetchedIssues = action.payload.issues || []
      return { ...state, issues: fetchedIssues }

    case ActionKind.filterIssuesAction:
      const { issues } = action.payload ?? { issues: [] }
      return { ...state, issues }

    case ActionKind.sortIssuesAction:
      const sortedIssues = action.payload.issues || []
      return { ...state, issues: sortedIssues  }

    default:
      return state;
  }
}

const BoardContext = createContext<BoardContextType | undefined>({
  state: initialState,
  dispatch: () => null,
})

export function BoardProvider({ children }: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState)

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const context = useContext(BoardContext)

  if (context === undefined) {
    throw new Error('useBoard must be used within a Board Provider')
  }

  return context
}
