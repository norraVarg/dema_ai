export const PAGE_SIZE_OPTIONS = [10, 20, 30]

export const getPageSize = (params: URLSearchParams | null) => {
    if (!params) {
        return PAGE_SIZE_OPTIONS[0]
    }

    const pageSizeParam = params.get('per_page')

    if (pageSizeParam === null) {
        return PAGE_SIZE_OPTIONS[0]
    }

    const pageSize = parseInt(pageSizeParam)

    if (isNaN(pageSize)) {
        return PAGE_SIZE_OPTIONS[0]
    }

    return pageSize
}

export const getPage = (params: URLSearchParams | null) => {
    if (!params) {
        return 1
    }

    const pageParam = params.get('page')

    if (pageParam === null) {
        return 1
    }

    const page = parseInt(pageParam)

    if (isNaN(page)) {
        return 1
    }

    return page
}

export const isFirstPage = (params: URLSearchParams | null) => {
    if (!params) {
        return true
    }

    const page = params.get('page')
    return page ? parseInt(page) === 1 : true
}