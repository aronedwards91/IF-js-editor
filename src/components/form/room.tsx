import { BaseInteractions, Directions } from "src/utils/type";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src//components/ui/form";
import { Input } from "src//components/ui/input";
import { Button } from "src//components/ui/button";

const DirectionEnum = z.nativeEnum(Directions);
type DirectionEnum = z.infer<typeof DirectionEnum>;

const BaseInteractionsEnum = z.nativeEnum(BaseInteractions);
type BaseInteractionsEnum = z.infer<typeof BaseInteractionsEnum>;

const stateSchema = z.union([
  z.string().min(2).max(500),
  z.number(),
  z.boolean(),
]);
const returnStringSchema = z.string().min(2).max(2000);
const itemIDSchema = z.string().min(2).max(200);

const itemIDArraySchema = z.array(itemIDSchema);

const InteractionSchema = z.union([returnStringSchema, stateSchema]);

// type Exits = z.infer<DirectionsOptions>;
const statCheckSchema = z.object({
  onPass: returnStringSchema,
  onFail: returnStringSchema,
  req: z.record(z.string(), stateSchema),
});

const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(1000),
  exits: z.record(
    z.union([DirectionEnum, z.string()]),
    z.union([z.string(), statCheckSchema])
  ),
  img: z.string().min(2).max(2000).optional(),
  interactions: z.record(
    z.union([BaseInteractionsEnum, z.string()]),
    InteractionSchema
  ),
  itemsList: itemIDArraySchema.optional(),
  placedItems: itemIDArraySchema.optional(),
  altNames: z.record(z.string().min(2), itemIDSchema).optional(),
  examinable: z.record(z.string().min(2), returnStringSchema).optional(),
});

export default function RoomForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "description...",
      exits: {},
      interactions: { help: "I can`t help you" },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Vals:", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name.." {...field} />
              </FormControl>
              <FormDescription>This is the room's name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description.." {...field} />
              </FormControl>
              <FormDescription>
                This is the room's description, the user will be given upon each
                entry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* exits */}

        {/* interactions */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
