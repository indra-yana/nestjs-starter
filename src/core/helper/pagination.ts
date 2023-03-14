export function paginate(data: any, page: number, limit: number, total: number) {    
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
        data: [...data],
        meta: {
            page,
            limit,
            totalRows: total,
            currentPage: page,
            nextPage: nextPage,
            prevPage: prevPage,
            lastPage: lastPage,
        },
    };
}

export function getSkip(page: number, limit: number) {
    return (page - 1) * limit;
}

export type PagingQuery = {
    page: number,
    limit: number,
}
