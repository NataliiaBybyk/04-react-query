import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData): void => {
    const query = formData.get("query") as string;

    // Якщо під час натискання кнопки відправки форми текстове поле порожнє,
    // покажіть користувачеві сповіщення про те, що необхідно ввести текст для пошуку зображень
    if (!query) {
      toast.error("Please enter your search query");
      // і припиняємо виконання функції
      return;
    }
    // У протилежному випадку викликаємо пропс і передаємо йому значення поля
    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSubmit} className={css.form}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
