export const Home = () => {
  return (
    <div className="App">
      <div className="flex flex-row justify-around items-center m-3">
        <div className="text-sm">Владивосток, ул. Русская 46 Б, 2 этаж.</div>
        <div className="text-sm">info@matdv.ru</div>
        <div className="text-sm">+7 423 248 07 07</div>
        <button className="bg-black hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded">
          Вход для учеников
        </button>
      </div>
      <div className="flex flex-col gap-10 items-center p-10 py-28 rounded-xl bg-black text-white">
        <div className=" text-4xl w-1/2 font-bold text-center">
          Дальневосточный центр математики
        </div>
        <div className="text-center w-1/3">
          Предлагает ученикам успешно подготовиться к ОГЭ и ЕГЭ, а также к
          математическим олимпиадам. Доверьте свое образование нам и достигните
          новых вершин в мире математики!
        </div>
        <div className="flex flex-row gap-5">
          <button className=" bg-orange-500 hover:bg-orange-700  font-bold py-2 px-4 rounded">
            Получить пробное занятие
          </button>
          <button className="bg-black border-white border-2 hover:bg-zinc-700 font-bold py-2 px-4 rounded">
            Получить пробное занятие
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center p-10">
        <div className="text-4xl text-center">
          Почему стоит выбрать именно нас?
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
        <div className="flex flex-row justify-around my-20">
          <div className="m-10 flex flex-col gap-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 m-auto"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="font-bold">Удобный график занятий</div>
            <div className="text-sm">
              Преподаватель подберет удобное время занятий именно для тебя
            </div>
          </div>
          <div className="m-10 flex flex-col gap-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 m-auto"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
            <div className="font-bold">Удобный график занятий</div>
            <div className="text-sm">
              Преподаватель подберет удобное время занятий именно для тебя
            </div>
          </div>
          <div className="m-10 flex flex-col gap-2 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 m-auto"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="font-bold">Удобный график занятий</div>
            <div className="text-sm">
              Преподаватель подберет удобное время занятий именно для тебя
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center p-10 py-28 rounded-xl bg-black text-white">
        <div className=" text-3xl text-center">Программы обучения</div>
        <div className="flex flex-row gap-10 text-center">
          <button className="flex flex-col gap-5 p-5 bg-black border-white border-2 hover:bg-zinc-700 font-bold py-2 px-4 rounded">
            <div>Занятия очно и онлайн с лучшими преподавателями</div>
            <div className="text-sm font-normal m-auto">
              Учим детей от Владивостока до Калининграда
            </div>
          </button>
          <button className="flex flex-col gap-5 p-5 bg-black border-white border-2 hover:bg-zinc-700 font-bold py-2 px-4 rounded">
            <div>Подготовка к ЕГЭ и ОГЭ по математике</div>
            <div className="text-sm font-normal m-auto">
              Для школьников 9-11 классов
            </div>
          </button>
          <button className="flex flex-col gap-5 p-5 bg-black border-white border-2 hover:bg-zinc-700 font-bold py-2 px-4 rounded">
            <div>Спецкурсы по задачам второй части ЕГЭ по математике</div>
            <div className="text-sm font-normal m-auto">
              Для школьников 10-11 классов
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center p-10 py-20">
        <div className="text-3xl text-center">Наша миссия</div>
        <div className="text-center w-2/3">
          Мы — математики и любим свою профессию. Приглашаем вас в наш центр,
          где вам помогут понять и полюбить эту замечательную и удивительную
          науку. Коллектив наших преподавателей станет вашим проводником в мир
          математики: научит находить различные решения задач, преодолевать
          трудности и неуверенность при решении сложных задач, анализировать и
          делать верные умозаключения. Мы наполним ваш разум математикой, что
          окажет огромную помощь в вашей дальнейшей работе и даст возможность
          достойно участвовать в большой жизни.
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center p-10 py-28 rounded-xl bg-black text-white">
        <div className="flex flex-col gap-4 w-1/3">
          <div className=" text-3xl">Записаться на пробное занятие</div>
          <div className="flex flex-col gap-3">
            <div>
              Оставьте свои данные, мы свяжемся с Вами в ближайшее время
            </div>
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full rounded p-2"
            />
            <input
              type="text"
              placeholder="+7 (999) 999-99-99"
              className="w-full rounded p-2"
            />
            <button className="bg-black border-white border-2 hover:bg-zinc-700 font-bold py-2 px-4 rounded">
              Получить пробное занятие
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
