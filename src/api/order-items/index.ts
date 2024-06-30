import { InsertTables } from "@/src/app/types";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query/build/legacy/QueryClientProvider";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { error, data: NewProduct } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return NewProduct;
    },
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
