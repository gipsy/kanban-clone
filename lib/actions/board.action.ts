"use server"

import { connectToDatabase } from "@/lib/mongoose"
import Board, { IBoard }     from "@/database/board.model"
import Issue, { IIssue }     from "@/database/issue.model"

import {
  GetBoardByIdParams,
  CreateBoardParams,
  DeleteBoardParams,
  GetBoardsParams
}                            from "./shared.types"
import { revalidatePath }    from "next/cache"
import { ModifyResult } from "mongoose"

export async function getBoards(params: GetBoardsParams) {
  try {
    await connectToDatabase()

    const { q } = params

    const boards = await Board.find({})
      .where({
        ...(q && { title: { $regex: new RegExp(q, "i") }})
      })

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

    const board = await Board.findById(id)
      .populate({ 
        path: 'issues', 
        model: Issue, 
        select: '_id title status rank description boardId createdAt',
        ...(q && {match: { title: new RegExp(q, "i") }}),
      })

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

    await Board.create({
      title,
    })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteBoard(params: DeleteBoardParams) {
  try {
    await connectToDatabase()

    const { _id, path } = params

    const deletedBoard = await Board.findByIdAndDelete({_id})
    const deletedBoardWithIssue = deletedBoard as ModifyResult<IBoard> & {
      issues: IIssue[]
    }

    for (const id of deletedBoardWithIssue.issues) {
      await Issue.deleteOne({_id: id})
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
