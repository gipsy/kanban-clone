import { useProvider } from 'test-data-provider';

import { 
  getTimestamp,
  formatBigNumber,
  createSortablePayloadByIndex,
  sortByLexoRankAsc
} from "@/lib/utils"

import {
  dummySortedIssues,
  dummySortedIssues4,
  sortablePayloadTop,
  sortablePayloadBottom,
  sortablePayloadBetween,
  dummyReactBeautifulDndTopEvent,
  dummyReactBeautifulDndBottomEvent,
  dummyReactBeautifulDndBetweenEvent,
} from "@/testHelpers/dataSets"

describe("Utils Test", () => {
  describe("formatDistanceToNow", () => {
    it("should return time from now", () => {
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

  describe("createSortablePayloadByIndex", () => {
    const dataProvider = [
      {
        description: "should return payload of top inserted entity",
        issues: dummySortedIssues,
        event: dummyReactBeautifulDndTopEvent,
        expected: sortablePayloadTop,
      },
      {
        description: "should return payload of bottom inserted entity",
        issues: dummySortedIssues,
        event: dummyReactBeautifulDndBottomEvent,
        expected: sortablePayloadBottom,
      },
      {
        description: "should return payload of between inserted entity",
        issues: dummySortedIssues4,
        event: dummyReactBeautifulDndBetweenEvent,
        expected: sortablePayloadBetween,
      }
    ]
    useProvider(dataProvider, ({ description, issues, event, expected }) => {
      test(description, () => {
        expect(createSortablePayloadByIndex(issues, event)).toEqual(expected);
      });
    });
  })

  describe("sortByLexoRankAsc", () => {
    it("should sort items by rank asc", () => {
      const a = { rank: "01" };
      const b = { rank: "02" };
  
      expect(sortByLexoRankAsc(a, b)).toBe(-1);
      expect(sortByLexoRankAsc(b, a)).toBe(1);
    });
  
    it("should handle missing ranks properly", () => {
      const a = { rank: "01" };
      const b = {};
  
      expect(sortByLexoRankAsc(a, b)).toBe(1);
      expect(sortByLexoRankAsc(b, a)).toBe(-1);
      expect(sortByLexoRankAsc(b, b)).toBe(0);
    });
  });
});