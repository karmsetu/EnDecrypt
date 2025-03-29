import axios from '@/api/axios';
import { Stock } from '@/types';

export const generateNewAccessToken = async (
    refreshToken: string
): Promise<{ accessToken: string } | null> => {
    try {
        const result = await axios.post(
            `/token`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );

        return {
            accessToken: result.data.accessToken,
        };
    } catch (error) {
        console.error(`error while generating new access token`, error);
        return null;
    }
};

export const loginAdmin = async (data: { name: string; password: string }) => {
    return await axios.post(`/login`, data);
};

export const getAllAdmin = async (accessToken: string) => {
    return await axios.get(`/admins`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllStock = () => fetch(`/stock`).then((res) => res.json());

export const addStock = async (
    data: { colorCode: string; quantity: number; price: number },
    accessToken: string
) => {
    return await axios.post(`/stock`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllUsers = async (accessToken: string) => {
    return await axios.get(`/users`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getAllOrders = async (accessToken: string) => {
    return await axios.get(`/orders`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getOrders = async (accessToken: string, param: string) => {
    return await axios.get(`/orders/${param}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getOrder = async (accessToken: string, param: string) => {
    return await axios.get(`/order/${param}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const approveOrder = async (accessToken: string, id: string) => {
    return await axios.post(
        `/order/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const markAsDelivered = async (accessToken: string, id: string) => {
    return await axios.post(
        `/order/deliver/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const declineOrder = async (accessToken: string, id: string) => {
    return await axios.delete(`/order/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getDashboardData = async (accessToken: string) => {
    return await axios.get(`/info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
};

export const getStock = async (colorCode: string) => {
    try {
        console.log({ colorCode });

        const result = await axios.get(
            `/stock/${colorCode.length ? colorCode : '0'}`
        );
        console.log(result);

        if (result.status === 404) {
            return { message: 'NOT_FOUND' };
        }

        return result.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateStock = async (
    data: Omit<Stock, '_id' | 'colorCode' | 'quantityInOrder'>,
    accessToken: string,
    id: string
) => {
    return await axios.put(`/stock/${id ? id : 'NO_STOCK'}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
};

export const deleteStock = async (id: string, accessToken: string) => {
    console.log('deleting...');

    return await axios.delete(`/stock/${id ? id : 'NO_STOCK'}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
};

export const refreshStock = async (id: string, accessToken: string) => {
    return await axios.post(
        `/stock/refresh/${id ? id : 'NO_STOCK'}`,
        {},
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
};
