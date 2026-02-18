import { baseApi } from './baseApi';

const departmentApis = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({
        url: `/employees/departments`,
        method: 'GET',
      }),
      providesTags: ['getAllDepartment'],
    }),

  })

})

export const {
useGetDepartmentsQuery

} = departmentApis