import { createFileRoute } from "@tanstack/react-router";
import {
  deleteExpense,
  getAllExpensesQueryOptions,
  loadingCreateExpenseQueryOptions,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(
    loadingCreateExpenseQueryOptions
  );

  if (error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <div className="max-w-3xl p-2 m-auto">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loadingCreateExpense?.expense && (
            <TableRow>
              <TableCell className="font-medium">
                {loadingCreateExpense.expense.id}
              </TableCell>
              <TableCell>{loadingCreateExpense.expense.title}</TableCell>
              <TableCell>{loadingCreateExpense.expense.amount}</TableCell>
              <TableCell>
                {loadingCreateExpense.expense.date.split("T")[0]}
              </TableCell>
            </TableRow>
          )}
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    <ExpenseDeleteButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error", {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      toast("Expense Deleted", {
        description: `Successfully deleted expense: ${id}`,
      });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter(
            (expense) => expense.id !== id
          ),
        })
      );
    },
  });

  return (
    <Button
      variant="outline"
      size="icon"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ id })}
    >
      {mutation.isPending ? "..." : <Trash className="w-4 h-4" />}
    </Button>
  );
}
