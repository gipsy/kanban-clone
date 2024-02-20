"use client"

import React, { createContext, useContext,
    useReducer, Dispatch, Reducer }        from "react"

import { IIssue }       from "@/database/issue.model"

export enum ActionKind {
  addIssueAction       = 'ADD_ISSUE',
  updateIssueAction    = 'UPDATE_ISSUE',
  deleteIssueAction    = 'DELETE_ISSUE',
  setEditedIssueAction = 'SET_EDITED_ISSUE',
  setIssuesAction      = 'SET_ISSUES',
}

type Action = 
  | { type: 'ADD_ISSUE', payload: { issue: IIssue } }
  | { type: 'UPDATE_ISSUE', payload: { issue: IIssue } }
  | { type: 'DELETE_ISSUE', payload: { _id: string } }
  | { type: 'SET_EDITED_ISSUE', payload: { issue: IIssue } }
  | { type: 'SET_ISSUES', payload: { issues: IIssue[] } }

type State = {
  issues: IIssue[];
  currentIssue: IIssue;
}

interface BoardContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export const initialState: State = {
  issues: [],
  currentIssue: {
    title: '',
    status: '',
    description: '',
    rank: '',
    boardId: '',
    createdAt: new Date()
  } as IIssue
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.addIssueAction:
      const { issue: addedIssue } = action.payload
      if (addedIssue) {
        return { ...state, issues: [...state.issues, addedIssue] }
      }

    case ActionKind.updateIssueAction:
      const updatedIssues = state.issues.map((issue) =>
        issue._id === action.payload.issue?._id ? action.payload.issue : issue)
      return { ...state, issues: updatedIssues }

    case ActionKind.deleteIssueAction:
      const { _id } = action.payload
      return {
        ...state, issues: state.issues.filter((issue) => issue._id !== _id)
      }

    case ActionKind.setEditedIssueAction:
      const { issue: currentIssue } = action.payload
      if (currentIssue) {
        return { ...state, currentIssue }
      }
      return state

    case ActionKind.setIssuesAction:
      const fetchedIssues = action.payload.issues || []
      return { ...state, issues: fetchedIssues }

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
