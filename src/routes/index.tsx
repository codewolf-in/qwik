import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <Link class="mindblow" href="/flower/">
        Blow my mind 🤯
      </Link>
      <Link class="mindblow" href="/todolist/">
        TODO demo 📝
      </Link>
      <Link class="mindblow" href="/counter/">
        Counter 📝
      </Link>
      <Link class="mindblow" href="/clock/">
        Clock 📝
      </Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
