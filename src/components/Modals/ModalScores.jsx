<div className="overflow-auto">
  <div className="relative">
    <div className="sticky top-0">Ученики</div>
    <div>
      {scores.map((score) => (
        <div
          key={score.id}
          className="flex items-center justify-between
                                     gap-3 p-1"
        >
          <div>{score.name}</div>
          <input
            type="number"
            value={score.score}
            className="w-16 resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white 
                                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          />
        </div>
      ))}
    </div>
  </div>
</div>;
