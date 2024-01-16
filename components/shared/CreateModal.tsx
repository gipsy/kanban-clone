"use client"

import React, { useState, useEffect, useRef } from 'react'
import { createPortal }       from "react-dom"
import Link                   from "next/link"
import { useTheme }           from '@/context/ThemeProvider'
import { useBoard }           from "@/context/BoardProvider"
import { Button }             from "@/components/ui/button"
import { Input }              from "@/components/ui/input"
import { Textarea }           from "@/components/ui/textarea"
import { zodResolver }        from "@hookform/resolvers/zod"
import { useForm }            from "react-hook-form"
import * as z                 from "zod"
import { LexoRank }           from "lexorank"

import { createBoard }        from "@/lib/actions/board.action"
import { createIssue,
  updateIssue }               from "@/lib/actions/issue.action"
import { 
  BoardsOrIssuesSchema }      from "@/lib/validations"
import { useRouter, 
  usePathname, useParams,
  useSearchParams
 }                            from "next/navigation"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
}                             from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}                             from "@/components/ui/select"

let type: string = 'create'

interface Props {
  board?: boolean;
  boardId: string;
}

// const CreateModal = ({ children }: React.PropsWithChildren) => {
const CreateModal = ({
  board,
  boardId
}: Props) => {
  const { mode } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { state, dispatch } = useBoard()

  useEffect(() => setMounted(true), [])

  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const issueId = searchParams.get('id')
  const pathname = usePathname()

  useEffect(() => {
    if (issueId !== null) {
      type = 'edit'
    }
  })

  const form = useForm<z.infer<typeof BoardsOrIssuesSchema>>({
    resolver: zodResolver(BoardsOrIssuesSchema),
    defaultValues: {
      title: issueId ? state.currentIssue.title : '',
      description: issueId ? state.currentIssue.description : '',
      status: issueId ? state.currentIssue.status : "to-do"
    }
  })

  function onCancelHandler(e) {
    e.preventDefault()
    if (params.id) {
      router.replace(`/board/${params.id}`, undefined, { shallow: true })
    } else {
      router.replace('/board', undefined, { shallow: true })
    }
  }

  async function onSubmit(values: z.infer<typeof BoardsOrIssuesSchema>) {
    setIsSubmitting(true)
    console.log('onSubmit')

    try {
      if (board) {
        await createBoard({
          title: values.title,
          issues: [],
          path: pathname
        })
        router.replace('/board', undefined, { shallow: true })
      } else {
        if (type === 'create') {
          console.log('CREATE')
          const colIssues = state.issues.filter(issue => issue.status === searchParams.get('status'))
          const latestEntity = colIssues[colIssues.length-1]

          const entityRank = latestEntity 
            ? LexoRank.parse(latestEntity.rank).genNext()
            : LexoRank.middle()

          const payload = {
            title: values.title,
            description: values.description,
            status: searchParams.get('status') || 'to-do',
            rank: entityRank.toString(),
            boardId: JSON.parse(boardId),
            // createdAt: state.currentIssue.createdAt,
            path: pathname
          }

          console.log('CREATE_BOARD', payload)
          console.log('searchParams', searchParams)
          
          try {
            const { response } = await createIssue(payload)
            dispatch({
              type: 'ADD_ISSUE', 
              payload: response
            })
            console.log('UPDATED_ISSUE', state.issues)
          } catch (error) {
            console.log(error)
          }
        } else {
          const payload = {
            _id: issueId,
            title: values.title,
            description: values.description,
            status: state.currentIssue.status,
            // createdAt: state.currentIssue.createdAt,
            path: pathname
          }

          try {
            const { response } = await updateIssue(payload)
            dispatch({
              type: 'UPDATE_ISSUE', 
              payload: response
            })
          } catch (error) {
            console.log(error)
          }
        }
        router.replace(`/board/${params.id}`, undefined, { shallow: true })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }


  return mounted ? createPortal(
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                {board ? 'Please enter your board name' : 'Name your issue'}
                              </h3>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                              <Input 
                                className="no-focus paragraph-regular
                                background-light700_dark300 light-border-2
                                text-dark300_light700 min-h-[56px] border
                                "
                                placeholder={board ? 'Type board name' : 'Type issue name'}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                    {!board && <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                Description
                              </h3>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                              <Textarea
                                className="no-focus paragraph-regular
                                background-light700_dark300 light-border-2
                                text-dark300_light700 min-h-[56px] border
                                "
                                placeholder="Issue description"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>}
                    {/* {!board && <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                Select status
                              </h3>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                              <Select
                                onValueChange={field.onChange} defaultValue={field.value}
                                // onValueChange={(e) => handleSelectValueChange(e, field)}
                              >
                                <SelectTrigger 
                                  className="no-focus paragraph-regular
                                    background-light700_dark300 light-border-2
                                    text-dark300_light700 min-h-[56px] border
                                  "
                                >
                                  <SelectValue placeholder="To Do" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem 
                                    className="no-focus paragraph-regular
                                      background-light700_dark300 light-border-2
                                      text-dark300_light700 min-h-[56px] border
                                    "
                                    value="to-do"
                                  >To Do</SelectItem>
                                  <SelectItem 
                                    className="no-focus paragraph-regular
                                      background-light700_dark300 light-border-2
                                      text-dark300_light700 min-h-[56px] border
                                    "
                                    value="in-progress">In Progress</SelectItem>
                                  <SelectItem 
                                    className="no-focus paragraph-regular
                                      background-light700_dark300 light-border-2
                                      text-dark300_light700 min-h-[56px] border
                                    "
                                    value="done"
                                  >Done</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>} */}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button 
                  type="submit" 
                  className="inline-flex w-full justify-center rounded-md bg-green-600 
                  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 
                  sm:ml-3 sm:w-auto"
                  disabled={isSubmitting}
                >{isSubmitting ? (
                  <>
                    {type === 'edit' ? 'Editing...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {type === 'edit' 
                      ? board ? 'Edit Board' : 'Edit Issue' 
                      : board ? 'Create new Board' : 'Create new Issue'}
                  </>
                )}</Button>
                <Button 
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={(e) => onCancelHandler(e)}
                >Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Form>, document.body) : null
}

export default CreateModal

