import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <p>You have to login or register</p>
      <Button asChild>
        <a href="/api/login">Login!</a>
      </Button>

      <Button asChild>
        <a href="/api/register">Register!</a>
      </Button>
    </div>
  );
};

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const queryClient = context.queryClient;
      const data = await queryClient.fetchQuery(userQueryOptions);

      return data;
    } catch (err) {
      return { user: null };
    }
  },
  component: Component,
});
