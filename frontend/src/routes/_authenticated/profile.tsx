import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) {
    return "pending";
  }

  if (error) {
    return "not logged in";
  }

  return (
    <div className="p-2">
      Hello from About!
      <p>{data.user.family_name}</p>
      <a href="/api/logout">Logout!</a>
    </div>
  );
}
