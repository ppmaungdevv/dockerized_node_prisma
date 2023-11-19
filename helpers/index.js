const getPagination = (page = 1, size = 10) => {
  const take = Number(size), skip = (page - 1) * take;
  return { take, skip }
}

const responseWithPagination = ({ data = [], total_data_count = 0, page = 1, size = 10 } = {}) => {
  return {
    current_page: Number(page),
    data,
    last_page: Math.ceil(total_data_count / size), // total pages
    per_page: Number(size),
    total: total_data_count,
  }
}

export {
  getPagination,
  responseWithPagination
}