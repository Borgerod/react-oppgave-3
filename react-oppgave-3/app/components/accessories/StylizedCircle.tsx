import React from "react";
import { cn } from "@/app/lib/utils";
// NOTE: imported from another project

interface StylizedCircleProps extends React.HTMLAttributes<HTMLDivElement> {
	colorRange?: string;
}

export const StylizedCircle: React.FC<StylizedCircleProps> = ({
	className,
	colorRange = "bg-transparent bg-radial-[at_25%_25%]  to-90% from-30% from-accent-neg to-accent-neg-dark/70",
	...props
}) => {
	const defaultSettings = "rounded-full aspect-square bg-accent";
	return (
		<div
			className={cn(
				defaultSettings,
				colorRange,
				className,
				"" //just to force prettier formatting
			)}
			{...props}
		/>
	);
};
