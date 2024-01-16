"use client"

import React, { createContext, useContext,
    useReducer }        from "react"

import { IIssue }       from "@/database/issue.model"
import { getIssueById } from "@/lib/actions/issue.action";
import { useRouter }    from "next/navigation"

interface BoardContextType {
   state: {
    issues: IIssue[];
    currentIssue: IIssue;
   },
   dispatch: () => void;
}

const initialState = {
  issues: [],
  currentIssue: {
    title: '',
    status: '',
    boardId: '',
    createdAt: ''
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ISSUE":
      console.log('ADD_ISSUE')
      console.log('ACTION.PAYLOAD', action.payload)
      console.log({ ...state, issues: [...state.issues, action.payload] })
      return { ...state, issues: [...state.issues, action.payload] }

    case "UPDATE_ISSUE":
      console.log('UPDATE_ISSUE', action.payload)
      const updatedIssue = state.issues.map((issue) => 
        issue._id === action.payload._id ? action.payload : issue)
      return { ...state, issues: updatedIssue }

    case "DELETE_ISSUE":
      console.log('DELETE_ISSUE', action.payload)
      const { _id } = action.payload
      return { ...state, issues: state.issues.filter((issue) => 
        issue._id !== _id)
      }

    case "SET_EDITED_ISSUE":
      console.log('SET_EDITED_ISSUE')
      const { issue } = action.payload
      console.log('ISSUE', issue)
      return { ...state, currentIssue: issue }

    case "SET_ISSUES":
      console.log('SET_ISSUES')
      console.log('action', action)
      const fetchedIssues = action.payload.issues || []
      return { ...state, issues: fetchedIssues }

    case "FILTER_ISSUES":
      const filteredIssues = action.payload.issues || []
      return { ...state, issues: filteredIssues }

    case "SORT_ISSUES":
      console.log('SORT_ISSUES')
      console.log('action.payload', action.payload)
      const sortedIssues = action.payload.issues || []
      return { ...state, issues: sortedIssues  }

    default:
      return state;
  }
}

const BoardContext = createContext<BoardContextType | undefined>({
  issues: initialState.issues,
  currentIssue: initialState.currentIssue,
  dispatch: () => null,
})

export function BoardProvider({ children }: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

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
