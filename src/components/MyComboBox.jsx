import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import PropTypes from "prop-types";

export const MyCombobox = ({ items, selected, setSelected }) => {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selected} onChange={(value) => setSelected(value)}>
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5",
            "focus:outline-none focus:ring-blue-500 focus:border-blue-500 data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          displayValue={(item) => item?.name}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск..."
          autoComplete="off"
          required={true}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
          <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
        </ComboboxButton>
      </div>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery("")}
      >
        <ComboboxOptions
          anchor="bottom"
          className="w-[var(--input-width)] rounded-xl border border-gray-300 bg-gray-50 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
        >
          {filteredItems.map((item) => (
            <ComboboxOption
              key={item.id}
              value={item}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 ">{item.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
};

MyCombobox.propTypes = {
  items: PropTypes.array,
  selected: PropTypes.object,
  setSelected: PropTypes.func,
};
