"use server"

import { connectToDatabase } from "@/lib/mongoose"
import Issue                 from "@/database/issue.model"
import Board                 from "@/database/board.model"

import {
  GetIssueByIdParams,
  CreateIssueParams,
  DeleteIssueParams,
  UpdateIssueParams
}                            from "./shared.types"
import { revalidatePath }    from "next/cache"

export async function getIssues() {
  try {
    await connectToDatabase()

    const issues = await Issue.find({})
      .sort({ createdAt: -1 })

    return { issues }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getIssue(params: GetIssueByIdParams) {
  try {
    await connectToDatabase()

    const { _id } = params

    const issue = await Issue.findOne({_id})

    return { issue }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createIssue(params: CreateIssueParams) {
  try {
    await connectToDatabase()

    const { title, description, status, rank, boardId, path } = params

    const data = await Issue.create({
      title,
      description,
      status,
      rank,
      boardId
    })

    await Board.findByIdAndUpdate(
      boardId,
      {
        $push: {
          issues: {
            _id: data._id,
            title: data.title,
          }
        }
      })

    const serializedResponse = JSON.parse(JSON.stringify(data))
    revalidatePath(path)
    return { response: serializedResponse }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateIssue(params: UpdateIssueParams) {
  try {
    await connectToDatabase()

    const { _id, title, description, rank, status, boardId, path } = params

    const replacement = {
      ...(title && {title}),
      ...(description && {description}),
      ...(rank && {rank}),
      ...(status && {status}),
      ...(boardId && {boardId}),
    }

    const data = await Issue.findOneAndUpdate({_id}, replacement, 
    {
      new: true,
      upsert: true,
      includeResultMetadata: true
    })
    const serializedResponse = JSON.parse(JSON.stringify(data.value))
    revalidatePath(path)
    return { response: serializedResponse }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteIssue(params: DeleteIssueParams) {
  try {
    await connectToDatabase()

    const { _id, boardId } = params

    await Issue.findOneAndDelete({_id})

    await Board.findByIdAndUpdate(
      boardId,
      {
        $pullAll: {
          issues: [
            {"_id": _id},
          ]
        }
      })
  } catch (error) {
    console.log(error)
    throw error
  }
}
