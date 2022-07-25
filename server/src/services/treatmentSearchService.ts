import {
  ITreatmentSearchQuery,
  ITreatmentSingleQuery,
} from "../interfaces/treatmentInterface";

/**
 * Generates the query for the treatment search
 * @param searchQuery the search query to generate the prisma query from
 * @returns the prisma query
 */
export const generateTreatmentSearchQuery = (
  searchQuery: ITreatmentSearchQuery[]
) => {
  const andQuery: any[] = searchQuery
    .filter((queryItem) => queryItem.connector === "AND")
    .map((queryItem) => handleTreatmentSearchGroupedQuery(queryItem.queries));

  const orQuery: any[] = searchQuery
    .filter((queryItem) => queryItem.connector === "OR")
    .map((queryItem) => handleTreatmentSearchGroupedQuery(queryItem.queries));

  handleFirstGroupedQuery(searchQuery[0], searchQuery[1], andQuery, orQuery);

  const query = removeEmptyArray({ OR: [...orQuery], AND: [...andQuery] });

  return query;
};

/**
 * Handles the generation of the query for each grouped query
 * @param queries the queries of the grouped query
 * @returns the corresponding prisma query for the grouped query
 */
const handleTreatmentSearchGroupedQuery = (
  queries: ITreatmentSingleQuery[]
) => {
  const andQuery: any[] = queries
    .filter((query) => query.connector === "AND")
    .map((query) => handleTreatmentSearchSingleQuery(query));

  const orQuery: any[] = queries
    .filter((query) => query.connector === "OR")
    .map((query) => handleTreatmentSearchSingleQuery(query));

  const notQuery: any[] = queries
    .filter((query) => query.connector === "AND_NOT")
    .map((query) => handleTreatmentSearchSingleQuery(query));

  handleFirstSingleQuery(queries[0], queries[1], andQuery, orQuery, notQuery);

  const query = removeEmptyArray({
    AND: [...andQuery],
    OR: [...orQuery],
    NOT: [...notQuery],
  });

  return query;
};

/**
 * Handles the generation of the prisma query for the single query item
 * @param queryItem the signle query item with field, condition, value and connector
 * @returns the corresponding prisma query for a single query item
 */
const handleTreatmentSearchSingleQuery = (queryItem: ITreatmentSingleQuery) => {
  if (queryItem.condition === "IS") {
    return handleTreatmentSearchIsQuery(queryItem);
  }

  if (queryItem.condition === "IS_NOT") {
    return handleTreatmentSearchIsNotQuery(queryItem);
  }

  if (queryItem.condition === "CONTAINS") {
    return handleTreatmentSearchContainsQuery(queryItem);
  }

  if (queryItem.condition === "IS_GREATER_THAN") {
    return handleTreatmentSearchGreaterThanQuery(queryItem);
  }

  if (queryItem.condition === "IS_LESS_THAN") {
    return handleTreatmentSearchLessThanQuery(queryItem);
  }

  if (queryItem.condition === "IS_GREATER_THAN_OR_EQUAL") {
    return handleTreatmentSearchGreaterThanOrEqualQuery(queryItem);
  }

  if (queryItem.condition === "IS_LESS_THAN_OR_EQUAL") {
    return handleTreatmentSearchLessThanOrEqualQuery(queryItem);
  }
};

/**
 * Handles the generation of the prisma query for is query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a is query
 */
const handleTreatmentSearchIsQuery = (queryItem: ITreatmentSingleQuery) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "equals");
  }
};

/**
 * Handles the generation of the prisma query for not query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a not query
 */
const handleTreatmentSearchIsNotQuery = (queryItem: ITreatmentSingleQuery) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "not");
  }
};

/**
 * Handles the generation of the prisma query for contains query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a contains query
 */
const handleTreatmentSearchContainsQuery = (
  queryItem: ITreatmentSingleQuery
) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "contains");
  }
};

/**
 * Handles the generation of the prisma query for greater than query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a greater than query
 */
const handleTreatmentSearchGreaterThanQuery = (
  queryItem: ITreatmentSingleQuery
) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "gt");
  }
};

/**
 * Handles the generation of the prisma query for less than query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a less than query
 */
const handleTreatmentSearchLessThanQuery = (
  queryItem: ITreatmentSingleQuery
) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "lt");
  }
};

/**
 * Handles the generation of the prisma query for greater than or equal to query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a greater than or equal to query
 */
const handleTreatmentSearchGreaterThanOrEqualQuery = (
  queryItem: ITreatmentSingleQuery
) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "gte");
  }
};

/**
 * Handles the generation of the prisma query for less than or equal to query
 * @param queryItem the single query item with field, condition, value and connector
 * @returns the corresponding prisma query for a less than or equal to query
 */
const handleTreatmentSearchLessThanOrEqualQuery = (
  queryItem: ITreatmentSingleQuery
) => {
  if (queryItem.field) {
    return genereateIsQueryBasedOnFieldType(queryItem, "lte");
  }
};

/**
 * Generates the query based on the field type and the condition
 * @param queryItem the query item with field, value and connector
 * @param type the condition to use
 * @returns the corresponding prisma query
 */
const genereateIsQueryBasedOnFieldType = (
  queryItem: ITreatmentSingleQuery,
  type: string
) => {
  if (queryItem.field === "date") {
    return generateQueryForDate(queryItem, type);
  }

  if (queryItem.field === "costs") {
    return {
      [queryItem.field]: {
        [type]: Number(queryItem.value),
      },
    };
  }

  if (queryItem.field === "animal" || queryItem.field === "customer") {
    return {
      [queryItem.field]: {
        name: {
          [type]: queryItem.value,
        },
      },
    };
  }

  if (queryItem.field) {
    return {
      [queryItem.field]: {
        [type]: queryItem.value,
      },
    };
  }
};

/**
 * Generates the query for the date field
 * @param queryItem the single query item with field === "date"
 * @param type the type of the query
 * @returns the corresponding prisma query
 */
const generateQueryForDate = (
  queryItem: ITreatmentSingleQuery,
  type: string
) => {
  if (
    (type === "equals" || type === "contains") &&
    queryItem.field === "date"
  ) {
    return {
      [queryItem.field]: {
        gte: new Date(`${queryItem.value} 00:00:00`),
        lte: new Date(`${queryItem.value} 23:59:59`),
      },
    };
  }

  if (type === "not" && queryItem.field === "date") {
    return {
      [queryItem.field]: {
        OR: [
          { lt: new Date(`${queryItem.value} 00:00:00`) },
          { gt: new Date(`${queryItem.value} 23:59:59`) },
        ],
      },
    };
  }

  if (queryItem.field === "date") {
    return {
      [queryItem.field]: {
        [type]: new Date(`${queryItem.value}`),
      },
    };
  }
};

/**
 * Removes empty arrays from an object
 * @param query the object to remove empty arrays from
 * @returns the object wihtout empty arrays
 */
const removeEmptyArray = (query: any) => {
  return Object.fromEntries(
    (Object.entries(query) as [string, any][]).filter(([_, v]) => v.length > 0)
  );
};

const handleFirstGroupedQuery = (
  firstGroupedQuery: ITreatmentSearchQuery,
  secondGroupedQuery: ITreatmentSearchQuery,
  andQuery: any[],
  orQuery: any[]
) => {
  if (!secondGroupedQuery || secondGroupedQuery.connector === "AND") {
    return andQuery.push(handleTreatmentSearchGroupedQuery(firstGroupedQuery.queries));
  }

  if (secondGroupedQuery.connector === "OR") {
    return orQuery.push(handleTreatmentSearchGroupedQuery(firstGroupedQuery.queries));
  }
};

const handleFirstSingleQuery = (
  firstQuery: ITreatmentSingleQuery,
  secondQuery: ITreatmentSingleQuery | undefined,
  andQuery: any[],
  orQuery: any[],
  notQuery: any[]
) => {
  if (!secondQuery || secondQuery.connector === "AND") {
    return andQuery.push(handleTreatmentSearchSingleQuery(firstQuery));
  }

  if (secondQuery.connector === "OR") {
    return orQuery.push(handleTreatmentSearchSingleQuery(firstQuery));
  }

  if (secondQuery.connector === "AND_NOT") {
    return notQuery.push(handleTreatmentSearchSingleQuery(firstQuery));
  }
};
