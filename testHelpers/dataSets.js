export const dummyIssues = [
  {
    _id: "65a658b27e21501e44e5377a",
    title: "2 Issue on First Board",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:38.692Z",
    description: "Description",
    rank: "0|hzzzzr:",
    status: "in-progress"
  },
  {
    _id: "65a6588d7e21501e44e5376d",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:01.499Z",
    description: "Description",
    rank: "0|hzzzzb:",
    status: "in-progress",
    title: "1 Issue on First Board"
  },
  {
    _id: "65a6cb2b45836e2162b9ac69",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:01.499Z",
    description: "Description",
    rank: "0|i00007:",
    status: "in-progress",
    title: "1 Issue on First Board"
  },
]

export const dummySortedIssues = 
[
  {
     "_id":"65a6588d7e21501e44e5376d",
     "title":"1 Issue on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyz:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T10:21:01.499Z"
  },
  {
     "_id":"65a6cb2b45836e2162b9ac69",
     "title":"2 on First Board",
     "status":"in-progress",
     "rank":"0|hzzzzp:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:30:03.167Z"
  },
  {
     "_id":"65a9615167afbcb2b47a0ae1",
     "title":"3 Issue",
     "status":"in-progress",
     "rank":"0|i0000f:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-18T17:35:13.205Z"
  }
]
export const dummySortedIssues4 =
[
  {
     "_id":"65a6588d7e21501e44e5376d",
     "title":"1 Issue on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyj:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T10:21:01.499Z"
  },
  {
     "_id":"65a6cb6e45836e2162b9ac76",
     "title":"3 Issue on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyn:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:31:10.142Z"
  },
  {
     "_id":"65a6cb2b45836e2162b9ac69",
     "title":"2 on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyr:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:30:03.167Z"
  },
  {
     "_id":"65a9615167afbcb2b47a0ae1",
     "title":"3 Issue",
     "status":"in-progress",
     "rank":"0|i0000f:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-18T17:35:13.205Z"
  }
]

export const sortablePayloadTop = 
{
  "entity":{
     "_id":"65a6cb2b45836e2162b9ac69",
     "title":"2 on First Board",
     "status":"in-progress",
     "rank":"0|hzzzzp:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:30:03.167Z"
  },
  "nextEntity":{
     "_id":"65a6588d7e21501e44e5376d",
     "title":"1 Issue on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyz:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T10:21:01.499Z"
  },
  "prevEntity": undefined
}

export const sortablePayloadBottom = 
{
  "entity":{
     "_id":"65a6cb2b45836e2162b9ac69",
     "title":"2 on First Board",
     "status":"in-progress",
     "rank":"0|hzzzzp:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:30:03.167Z"
  },
  "prevEntity": {
     "_id":"65a9615167afbcb2b47a0ae1",
     "title":"3 Issue",
     "status":"in-progress",
     "rank":"0|i0000f:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-18T17:35:13.205Z"
  },
  "nextEntity": undefined,
}

export const sortablePayloadBetween =
{
  "prevEntity":{
     "_id":"65a6588d7e21501e44e5376d",
     "title":"1 Issue on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyj:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T10:21:01.499Z"
  },
  "entity":{
     "_id":"65a6cb6e45836e2162b9ac76",
     "title":"3 Issue on First Board",
     "rank": "0|hzzzyn:",
     "status": "in-progress",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:31:10.142Z"
  },
  "nextEntity":{
     "_id":"65a6cb2b45836e2162b9ac69",
     "title":"2 on First Board",
     "status":"in-progress",
     "rank":"0|hzzzyr:",
     "description":"Description",
     "boardId":"65a653937e21501e44e5372a",
     "createdAt":"2024-01-16T18:30:03.167Z"
  }
}

export const dummyReactBeautifulDndTopEvent = 
{
  "draggableId":"65a6cb2b45836e2162b9ac69",
  "type":"DEFAULT",
  "source":{
     "index":1,
     "droppableId":"in-progress"
  },
  "reason":"DROP",
  "mode":"FLUID",
  "destination":{
     "droppableId":"in-progress",
     "index":0
  },
  "combine":null
}

export const dummyReactBeautifulDndBottomEvent = 
{
  "draggableId":"65a6cb2b45836e2162b9ac69",
  "type":"DEFAULT",
  "source":{
     "index":1,
     "droppableId":"in-progress"
  },
  "reason":"DROP",
  "mode":"FLUID",
  "destination":{
     "droppableId":"in-progress",
     "index":2
  },
  "combine":null
}

export const dummyReactBeautifulDndBetweenEvent =
{
  "draggableId":"65a6cb6e45836e2162b9ac76",
  "type":"DEFAULT",
  "source":{
     "index":0,
     "droppableId":"done"
  },
  "reason":"DROP",
  "mode":"FLUID",
  "destination":{
     "droppableId":"in-progress",
     "index":1
  },
  "combine":null
}
