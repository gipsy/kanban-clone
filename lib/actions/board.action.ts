"use server"

import { connectToDatabase } from "@/lib/mongoose"
import Board                 from "@/database/board.model"
import Issue                 from "@/database/issue.model"

import {
  GetBoardByIdParams,
  CreateBoardParams,
  DeleteBoardParams,
  GetBoardsParams
}                            from "./shared.types"
import { revalidatePath }    from "next/cache"

export async function getBoards(params: GetBoardsParams) {
  try {
    await connectToDatabase()

    const { q } = params

    const boards = await Board.find({})
      .where({
        ...(q && { title: { $regex: new RegExp(q, "i") }})
      })

    console.log('Boards', boards)
    if (!boards) {
      return []
    }

    return boards
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getBoardById(params: GetBoardByIdParams) {
  try {
    await connectToDatabase()

    const { id, q } = params

    console.log('QUERY', q)

    const board = await Board.findById(id)
      .populate({ 
        path: 'issues', 
        model: Issue, 
        select: '_id title status rank description boardId createdAt',
        match: { title: new RegExp(q, "i") },
      })

    console.log('board', board)
    return board
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createBoard(params: CreateBoardParams) {
  try {
    await connectToDatabase()

    const { title, path } = params

    const board = await Board.create({
      title,
    })


    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteBoard(params: DeleteBoardParams) {
  console.log('DELETE_BOARD')
  try {
    await connectToDatabase()

    const { _id, path } = params

    const deletedBoard = await Board.findByIdAndDelete({_id})

    for (const id of deletedBoard.issues) {
      console.log('ISSUE ID', id)
      const deletedIssue = await Issue.deleteOne({_id: id})
      console.log('deletedIssue', deletedIssue)
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
