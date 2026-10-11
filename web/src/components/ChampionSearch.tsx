/** Picks a champion by typing part of its name. */
import { useId, useMemo, useRef, useState } from "react";
import type { Champion } from "../../../engine/types";

interface Props {
  label: string;
  champions: Champion[];
  value?: Champion;
  /** Champions to mark as simulated in the list. */
  simulated: Set<string>;
  onPick(champion: Champion): void;
}

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export function ChampionSearch({ label, champions, value, simulated, onPick }: Props) {
  const id = useId();
  const listId = `${id}-options`;
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const shown = useMemo(() => {
    const q = key(query ?? "");
    if (!q) return champions;
    const starts = champions.filter((c) => key(c.name).startsWith(q) || key(c.id).startsWith(q));
    const inside = champions.filter((c) => !starts.includes(c) && key(c.name).includes(q));
    return [...starts, ...inside];
  }, [champions, query]);

  const pick = (champion: Champion) => {
    onPick(champion);
    setQuery(undefined);
    setOpen(false);
    input.current?.blur();
  };

  return (
    <div className="field pick">
      <label htmlFor={id}>{label}</label>
      <div className="combo">
        <input
          ref={input}
          id={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && shown[active] ? `${id}-${shown[active].id}` : undefined}
          autoComplete="off"
          spellCheck={false}
          placeholder="Type a champion"
          value={query ?? value?.name ?? ""}
          onFocus={(event) => {
            event.currentTarget.select();
            setOpen(true);
          }}
          onBlur={() => {
            setQuery(undefined);
            setOpen(false);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(shown.length - 1, a + 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (event.key === "Enter") {
              event.preventDefault();
              const choice = shown[active] ?? shown[0];
              if (choice) pick(choice);
            } else if (event.key === "Escape") {
              setQuery(undefined);
              setOpen(false);
            }
          }}
        />
        {open ? (
          <ul className="options" id={listId} role="listbox">
            {shown.length === 0 ? <li className="none">No champion by that name</li> : null}
            {shown.map((champion, i) => (
              <li
                key={champion.id}
                id={`${id}-${champion.id}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(event) => {
                  event.preventDefault();
                  pick(champion);
                }}
              >
                <span>{champion.name}</span>
                {simulated.has(champion.id) ? <span className="tag full">Simulated</span> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
