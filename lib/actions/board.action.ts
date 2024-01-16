"use server"

import { connectToDatabase } from "@/lib/mongoose"
import Board                 from "@/database/board.model"
import Issue                 from "@/database/issue.model"

import { DeleteBoardParams } from "@/lib/actions/shared.types"
import {
  GetBoardByIdParams,
  CreateBoardParams
}                            from "./shared.types"
import { revalidatePath }    from "next/cache"

export async function getBoards() {
  try {
    await connectToDatabase()

    const boards = await Board.find({})

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

    const { id } = params

    const board = await Board.findById(id)
      .populate({ path: 'issues', model: Issue, select: '_id title status rank description boardId createdAt' })

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
