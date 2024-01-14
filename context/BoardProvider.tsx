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
      return { ...state, issues: [...state.issues, action.payload] }

    case "DELETE_ISSUE":
      console.log('DELETE_ISSUE')
      return { ...state, issues: state.issues.filter((issue, index) => 
        issue._id !== action.payload.id)
      }

    case "UPDATE_ISSUE":
      console.log('UPDATE_ISSUE', action.payload)
      const updatedIssue = state.issues.map((issue, index) => 
        issue._id === action.payload._id ? action.payload : issue)
      return { ...state, issues: updatedIssue }

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
