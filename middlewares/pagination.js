/* 
* middlware for adding take & skip to req for querying with pagination
*/

import { getPagination } from '../helpers/index.js'

export const paginateRequest = (req, res, next) => {
  if (req.method == 'GET') {
    const { page, size } = req.query
    const { take, skip } = getPagination(page, size)
    req.take = take
    req.skip = skip
  }
  next()
}