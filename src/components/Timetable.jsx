import PropTypes from "prop-types";

export const Timetable = () => {
  const lessons = [
    {
      id: 8,
      date: "1999-02-01",
      startTime: "03:21",
      endTime: "21:32",
      auditorium: {
        id: 55,
        name: "Кабинет 3",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 1,
      date: "2024-06-01",
      startTime: "10:00",
      endTime: "11:00",
      auditorium: {
        id: 56,
        name: "Кабинет2",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 5,
      date: "2024-05-30",
      startTime: "10:10",
      endTime: "12:22",
      auditorium: {
        id: 53,
        name: "Кабинет 1",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 6,
      date: "2024-02-03",
      startTime: "11:11",
      endTime: "16:37",
      auditorium: {
        id: 55,
        name: "Кабинет 3",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 4,
      date: "2002-01-01",
      startTime: "12:33",
      endTime: "13:32",
      auditorium: {
        id: 56,
        name: "Кабинет2",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 3,
      date: "2024-06-08",
      startTime: "12:58",
      endTime: "12:01",
      auditorium: {
        id: 56,
        name: "Кабинет2",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 2,
      date: "2024-06-08",
      startTime: "12:58",
      endTime: "12:01",
      auditorium: {
        id: 56,
        name: "Кабинет2",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 7,
      date: "2001-10-10",
      startTime: "20:01",
      endTime: "21:58",
      auditorium: {
        id: 55,
        name: "Кабинет 3",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
    {
      id: 9,
      date: "1999-12-12",
      startTime: "21:21",
      endTime: "22:22",
      auditorium: {
        id: 56,
        name: "Кабинет2",
      },
      studyGroup: {
        id: 12,
        name: "fd",
        category: {
          id: 9,
          name: "ABC",
        },
        teacher: {
          id: 3,
          name: "Kadomtcev Vyacheslav",
        },
      },
      hometask: null,
    },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-center items-center mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="w-12 h-12 flex justify-center items-center bg-gray-200 mx-1"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {lessons.map((event) => (
          <div key={event.id} className="flex justify-center items-center mb-1">
            <div
              className="w-12 h-12 flex justify-center items-center bg-gray-200 mx-1"
              style={{
                backgroundColor: "red",
              }}
            >
              {event.startTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

{
  /* Timetable.propTypes = {
  lessons: PropTypes.array,
}; */
}
