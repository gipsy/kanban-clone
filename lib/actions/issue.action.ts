"use server"

import { connectToDatabase } from "@/lib/mongoose";
import Issue                 from "@/database/issue.model";
import Board                 from "@/database/board.model";

import {
  GetIssuesParams,
  GetIssueByIdParams,
  CreateIssueParams,
  UpdateIssueParams,
  DeleteIssueParams
}                            from "./shared.types";
import { revalidatePath }    from "next/cache";

export async function getIssues(params: GetIssuesParams) {
  console.log('params', params)
  try {
    await connectToDatabase()

    const issues = await Issue.find({})
      .sort({ createdAt: -1 })

    console.log('getIssues', issues)

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

    const issue = await Issue.findOne({_id}).exec()

    console.log('getIssue', issue)
    return { issue }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function createIssue(params: CreateIssueParams) {
  console.log('createIssue')
  try {
    await connectToDatabase()

    const { title, description, status, rank, boardId, path } = params

    const issue = await Issue.create({
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
            _id: issue._id,
            // title: issue.title,
            // description: issue.description,
            // status: issue.status,
            // rank: issue.rank,
            // createdAt: issue.createdAt
          }
        }
      })

    console.log('issue', issue)

    return { issue }
    // revalidatePath(path)
  } catch (error) {
    console.log(error)
  }
}

export async function updateIssue(params: UpdateIssueParams) {
  console.log('updateIssue', params)
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

    const issue = await Issue.findOneAndUpdate({_id}, replacement, {
      new: true,
      upsert: true,
      includeResultMetadata: true
    })

    return { issue }
  } catch (error) {
    console.log(error)
  }
}

export async function deleteIssue(params: DeleteIssueParams) {
  try {
    await connectToDatabase()

    const { _id } = params

    console.log('PARAMS', params)
    const issue = await Issue.findOneAndDelete({_id})
    console.log('DELETED_ISSUE', issue)
  } catch (error) {
    console.log(error)
  }
}
