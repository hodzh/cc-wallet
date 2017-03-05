export interface QueryResult {
  /**
   * Array of documents
   */
  docs: any[];
  /**
   * Total number of documents in collection that match a query
   */
  total: number;
  /**
   * Limit that was used
   */
  limit: number;
  /**
   * Only if specified or default page/offset values were used
   */
  page?: number;
  /**
   * Only if page specified or default page/offset values were used
   */
  pages?: number;
  /**
   * Only if specified or default page/offset values were used
   */
  offset?: number;
}
