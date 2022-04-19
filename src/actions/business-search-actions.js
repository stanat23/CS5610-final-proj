import * as service from '../services/business-search-service'

export const FIND_ALL_BUSINESSES = 'FIND_ALL_BUSINESSES';

export const findAllBusinesses = async (dispatch) => {
    const businesses = await service.findAllBusinesses();
    dispatch({
        type: FIND_ALL_BUSINESSES,
        businesses
    });
}