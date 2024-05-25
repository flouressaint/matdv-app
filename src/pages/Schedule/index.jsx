export const Schedule = () => {
  return (
    <div className="h-svh">
      <div className="w-full border-2 border-black rounded-b-3xl flex flex-row justify-center gap-10 p-5">
        <button className="bg-black text-white hover:bg-zinc-700 font-bold py-2 px-4 rounded-xl">
          Расписание занятий
        </button>
        <button className="border-black hover:bg-slate-300 border-2 font-bold py-2 px-4 rounded-xl">
          Получить пробное занятие
        </button>
      </div>
      <h1>Schedule</h1>
    </div>
  );
};
