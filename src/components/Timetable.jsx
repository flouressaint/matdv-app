import PropTypes from "prop-types";
import { LessonItem } from "./LessonItem.jsx";
import { useState } from "react";
import { ModalCreateLesson } from "./Modals/ModalCreateLesson.jsx";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export const Timetable = ({ lessons }) => {
  const [createIsOpen, setCreateIsOpen] = useState(false);

  const now = new Date();
  const [startDate, setStartDate] = useState(
    new Date(now.setDate(now.getDate() - now.getDay()))
  );
  const days = [];
  let date = new Date(startDate);
  for (let i = 0; i < 6; i++) {
    days.push(new Date(date.setDate(date.getDate() + 1)));
  }

  const [lesson, setLesson] = useState({
    date: "",
    startTime: "10:00",
    endTime: "11:00",
    auditorium: {
      id: "",
      name: "",
    },
    studyGroup: {
      id: "",
      name: "",
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-row">
          <button
            onClick={() => {
              let date = new Date(startDate);
              setStartDate(date.setDate(date.getDate() - 7));
            }}
          >
            <ArrowLeftIcon className="size-6" />
          </button>
          <button
            onClick={() => {
              let date = new Date(startDate);
              setStartDate(date.setDate(date.getDate() + 7));
            }}
          >
            <ArrowRightIcon className="size-6" />
          </button>
        </div>
        {days.map((day) => (
          <div
            key={day.getDate()}
            className="flex flex-col gap-1 border-b p-3 border-zinc-200 dark:border-zinc-700"
          >
            <div className="flex flex-row items-center gap-2 text-lg font-bold">
              <button
                onClick={() => {
                  setLesson({
                    ...lesson,
                    date: day
                      .toLocaleDateString("ru-RU")
                      .split("T")[0]
                      .split(".")
                      .reverse()
                      .join("-"),
                  });
                  setCreateIsOpen(!createIsOpen);
                }}
                className=" text-base bg-slate-500 p-2 rounded-lg hover:bg-slate-400"
              >
                <PlusCircleIcon className="size-6" />
              </button>
              <div>
                {day.toLocaleDateString("ru-RU", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
            </div>
            <div className="flex flex-row gap-1 flex-wrap">
              {lessons
                .filter(
                  (lesson) =>
                    lesson.date ==
                    day
                      .toLocaleDateString("ru-RU")
                      .split("T")[0]
                      .split(".")
                      .reverse()
                      .join("-")
                )
                .map((lesson) => (
                  <LessonItem key={lesson.id} lesson={lesson} />
                ))}
            </div>
          </div>
        ))}
      </div>
      <ModalCreateLesson
        lesson={lesson}
        setLesson={setLesson}
        isOpen={createIsOpen}
        setIsOpen={setCreateIsOpen}
      />
    </div>
  );
};

Timetable.propTypes = {
  lessons: PropTypes.array,
};
