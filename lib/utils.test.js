import { 
  getTimestamp,
  formatBigNumber,
  sortByLexoRankAsc,
  createSortablePayloadByIndex,
  // getBetweenRankAsc,
  // pluralize
} from "@/lib/utils"

const mockedSamePositionReactBeautifulDndEvent = {
  combine: null,
  destination: {
    droppableId: "to-do",
    index: 0,
  },
  source: {
    droppableId: "to-do",
    index: 0
  },
  draggableId: "65a658b27e21501e44e5377a",
  mode: "FLUID",
  reason: "DROP",
  type: "DEFAULT"
}

// const mockedLastPositionOfColumnReactBeautifulDndEvent = {
//   combine: null,
//   destination: {
//     droppableId: "to-do",
//     index: 0,
//   },
//   source: {
//     droppableId: "to-do",
//     index: 1
//   },
//   draggableId: "65a658b27e21501e44e5377a",
//   mode: "FLUID",
//   reason: "DROP",
//   type: "DEFAULT"
// }

const mockedIssues = [
  {
    _id: "65a6588d7e21501e44e5376d",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:01.499Z",
    description: "Description",
    rank: "0|hzzzzr:",
    status: "in-progress",
    title: "1 Issue on First Board"
  },
  {
    _id: "65a658b27e21501e44e5377a",
    title: "2 Issue on First Board",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:38.692Z",
    description: "Description",
    rank: "0|hzzzzb:",
    status: "to-do"
  }
]

const mockedSortedIssues = [
  {
    _id: "65a658b27e21501e44e5377a",
    title: "2 Issue on First Board",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:38.692Z",
    description: "Description",
    rank: "0|hzzzzb:",
    status: "to-do"
  },
  {
    _id: "65a6588d7e21501e44e5376d",
    boardId: "65a653937e21501e44e5372a",
    createdAt: "2024-01-16T10:21:01.499Z",
    description: "Description",
    rank: "0|hzzzzr:",
    status: "in-progress",
    title: "1 Issue on First Board"
  }
]

const mockedSortablePayloadSamePosition = {
  prevEntity: undefined,
  entity: {
    _id: '65a658b27e21501e44e5377a',
    title: '2 Issue on First Board',
    boardId: '65a653937e21501e44e5372a',
    createdAt: '2024-01-16T10:21:38.692Z',
    description: 'Description',
    rank: '0|hzzzzb:',
    status: 'to-do'
  },
  nextEntity: undefined
}

describe("Utils Test", () => {
  describe("formatDistanceToNow", () => {
    it("should return time from now in words", () => {
      const dateTime = new Date(jest.now());
      const timeFromNow = getTimestamp(dateTime);

      expect(timeFromNow).toBe('less than a minute ago');
    });
  });

  describe("formatBigNumber", () => {
    it("should format big numbers to millions", () => {
      const oneMillion = formatBigNumber(1000000);

      expect(oneMillion).toBe('1.00M');
    });

    it("should format big numbers to thousands", () => {
      const oneThousand = formatBigNumber(1000);

      expect(oneThousand).toBe('1.00K');
    });
  });

  describe("sortByLexoRankAsc", () => {
    it("should return sorted issues by rank value", () => {
      const sorted = mockedIssues.sort(sortByLexoRankAsc);

      expect(sorted).toEqual(mockedSortedIssues);
    });
  })

  describe("createSortablePayloadByIndex", () => {
    it("should return payload of same position in same column", () => {
      const sortablePayload = createSortablePayloadByIndex(
        mockedSortedIssues, 
        mockedSamePositionReactBeautifulDndEvent
      );

      expect(sortablePayload).toEqual(mockedSortablePayloadSamePosition)
    });

    it("should return payload of last position on same column", () => {
      // const sortablePayload = createSortablePayloadByIndex(
      //   mockedSortedIssues, 
      //   mockedLastPositionOfColumnReactBeautifulDndEvent
      // );

      // expect(sortablePayload).toEqual(mockedSortablePayloadLastPosition)
    });
  })

  describe("getBetweenRankAsc", () => {
    it("should return", () => {

    })
  });
});