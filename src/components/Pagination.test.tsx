import { getPage, getPageSize, isFirstPage } from "./Pagination.utils";

describe('getPageSize', () => {
    it('should return 10 when no params are passed', () => {
        const result = getPageSize(null);
        expect(result).toBe(10);
    });

    it('should return 20 when params are passed', () => {
        const params = new URLSearchParams();
        params.set('per_page', '20');
        const result = getPageSize(params);
        expect(result).toBe(20);
    });

    it('should return 10 when params are passed but no per_page', () => {
        const params = new URLSearchParams();
        const result = getPageSize(params);
        expect(result).toBe(10);
    });

    it('should return 10 when params are passed but per_page is not a number', () => {
        const params = new URLSearchParams();
        params.set('per_page', 'a');
        const result = getPageSize(params);
        expect(result).toBe(10);
    });
})

describe('getPage', () => {
    it('should return 1 when no params are passed', () => {
        const result = getPage(null);
        expect(result).toBe(1);
    });

    it('should return 2 when params are passed', () => {
        const params = new URLSearchParams();
        params.set('page', '2');
        const result = getPage(params);
        expect(result).toBe(2);
    });

    it('should return 1 when params are passed but no page', () => {
        const params = new URLSearchParams();
        const result = getPage(params);
        expect(result).toBe(1);
    });

    it('should return 1 when params are passed but page is not a number', () => {
        const params = new URLSearchParams();
        params.set('page', 'a');
        const result = getPage(params);
        expect(result).toBe(1);
    });
})

describe('isFirstPage', () => {
    it('should return true when no params are passed', () => {
        const result = isFirstPage(null);
        expect(result).toBe(true);
    });

    it('should return true when params are passed but no page', () => {
        const params = new URLSearchParams();
        const result = isFirstPage(params);
        expect(result).toBe(true);
    });

    it('should return true when params are passed but page is 1', () => {
        const params = new URLSearchParams();
        params.set('page', '1');
        const result = isFirstPage(params);
        expect(result).toBe(true);
    });

    it('should return false when params are passed and page is not 1', () => {
        const params = new URLSearchParams();
        params.set('page', '2');
        const result = isFirstPage(params);
        expect(result).toBe(false);
    });
})


