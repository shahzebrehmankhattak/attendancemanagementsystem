import { baseApi } from './baseApi';


const employeeApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployee: builder.query({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
      providesTags: ['getAllEmployee'],
    }),
    getEmployeeById: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
      providesTags: ['getAllEmployee'],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: '/employees',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['getAllEmployee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/employees/${id}`, // id in URL
        method: 'PUT',
        body: data, // rest of values in body
      }),
      invalidatesTags: ['getAllEmployee'],
    }),


  }),


});
export const {
useGetAllEmployeeQuery,
useGetEmployeeByIdQuery,
useCreateEmployeeMutation,
useUpdateEmployeeMutation,

} = employeeApis;