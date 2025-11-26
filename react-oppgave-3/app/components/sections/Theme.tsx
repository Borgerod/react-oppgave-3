import { cn } from "@/app/lib/utils";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export default function Todo() {
	return (
		<section
			className={cn(
				"@Container",
				"container level-1",
				"grid",
				"grid-cols-2",
				"bg-background/90 dark:bg-foreground",
				"col-start-1 col-span-2 row-start-4 row-span-1",
				"text-secondary font-extralight text-xl p-7",
				""
			)}
		>
			<div className="col-start-1 col-span-1 font-thin self-start ">
				<h3> Theme </h3>
				<p className="font-thin text-sm text-secondary/60">
					Set to theme mode
				</p>
			</div>
			<div className="col-start-2 col-span-1 flex items-center justify-end">
				<ThemeToggle />
			</div>
		</section>
	);
}
