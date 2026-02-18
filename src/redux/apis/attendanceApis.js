import { baseApi } from './baseApi';

const attendanceApis = baseApi.injectEndpoints({
  overrideExisting: false,

  endpoints: (builder) => ({
    getDailySingleEmployeeAttendance: builder.query({
      query: ({ id }) => ({
        url: `/attendance/employee/${id}`,
        method: 'GET',
        params: {
          employeeId: id,
        },
      }),
      providesTags: ['MonthlyAttendance'],
    }),
    getDailyEmployeeAttendance: builder.query({
      query: ({ start, end }) => ({
        url: `/attendance`,
        method: 'GET',
        params: {
          start,
          end,
        },
      }),
      providesTags: ['MonthlyAttendance'],
    }),
    updatePunchTimeById: builder.mutation({
      query: ({ attendanceLogId, punchTime }) => ({
        url: `attendance/${attendanceLogId}/punch-time`,
        method: "PUT",
        params: { punchTime },
      }),
      invalidatesTags: ["MonthlyAttendance"], // so the table refreshes
    }),
    updateAttendanceRemarks: builder.mutation({
      query: ({ attendanceLogId,remarks }) => ({
        url: `/attendance/${attendanceLogId}/remarks`,
        method: "PUT",
        body: { remarks },
      }),
      invalidatesTags: ["MonthlyAttendance"], // so the table refreshes
    }),

  }),
});

export const {
  useGetDailySingleEmployeeAttendanceQuery,
  useGetDailyEmployeeAttendanceQuery,
  useUpdatePunchTimeByIdMutation,
  useUpdateAttendanceRemarksMutation
} = attendanceApis;