"use client"

import React, { createContext, useContext,
    useReducer, Dispatch, Reducer }        from "react"

import { IIssue }       from "@/database/issue.model"
import { TEntity } from "@/types"

enum ActionKind {
  addIssue       = 'ADD_ISSUE',
  updateIssue    = 'UPDATE_ISSUE',
  deleteIssue    = 'DELETE_ISSUE',
  setEditedIssue = 'SET_EDITED_ISSUE',
  setIssues      = 'SET_ISSUES',
  filterIssues   = 'FILTER_ISSUES',
  sortIssues     = 'SORT_ISSUES'
}

type Action = {
  type: ActionKind,
  payload: {
    _id?: string,
    issue?: IIssue,
    issues: IIssue[]
  }
}

// type State = {
//   issues: IIssue[];
//   currentIssue: IIssue;
// }
type State = {
  issues: IIssue[] | any[];
  currentIssue?: IIssue | TEntity;
  // currentIssue?: {
  //   title: string;
  //   status: string;
  //   rank: string;
  //   description: string;
  //   boardId: string;
  //   createdAt: string;
  // };
}

interface BoardContextType {
   state: State;
  // state: {
  //   issues: IIssue[];
  //   currentIssue: {
  //     title: string;
  //     status: string;
  //     rank: string;
  //     description: string;
  //     boardId: string;
  //     createdAt: string;
  //   };
  // }
  dispatch: Dispatch<any>;
}

const initialState: State = {
  issues: [],
  currentIssue: {
    title: '',
    status: '',
    description: '',
    rank: '',
    boardId: '',
    // createdAt: ''
  }
}

const reducer = (state: State, action: Action) => {
  console.log('STATE', state)
  switch (action.type) {
    case ActionKind.addIssue:
      return { ...state, issues: [...state.issues, action.payload] }

    case ActionKind.updateIssue:
      const updatedIssues = state.issues.map((issue) => 
        issue._id === action.payload._id ? action.payload : issue)
      return { ...state, issues: updatedIssues }

    case ActionKind.deleteIssue:
      const { _id } = action.payload
      return { ...state, issues: state.issues.filter((issue) => 
        issue._id !== _id)
      }

    case ActionKind.setEditedIssue:
      const { issue } = action.payload
      return { ...state, currentIssue: issue }

    case ActionKind.setIssues:
      const fetchedIssues = action.payload.issues || []
      return { ...state, issues: fetchedIssues }

    case ActionKind.filterIssues:
      const { issues } = action.payload ?? { issues: [] }
      return { ...state, issues }

    case ActionKind.sortIssues:
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
