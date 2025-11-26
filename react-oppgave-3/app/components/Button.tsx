"use client";
import { Children, ReactNode, Component, MouseEventHandler } from "react";
import { cn } from "../lib/utils";
import { ClassNameValue } from "tailwind-merge";
interface ButtonProps {
	icon?: ClassNameValue;
	type?: "glass" | "solid" | "hollow";
	shape?: "circle" | "pill" | "rounded";
	children: ReactNode;
	className?: ClassNameValue;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	buttonType?: "submit" | "reset" | "button";
}

export default class Button extends Component<ButtonProps> {
	render() {
		const { icon } = this.props;
		const { buttonType } = this.props;
		const { type } = this.props;
		const { shape } = this.props;
		const { children } = this.props;
		const { className } = this.props;
		const { onClick } = this.props;

		function getShape(shape: string) {
			switch (shape) {
				case "circle":
					return "rounded-full aspect-square w-fit  px-0";
				case "pill":
					return "rounded-full";
				case "rounded":
					return "rounded-lg";
			}
		}

		function getType(type: string) {
			switch (type) {
				case "glass":
					return "";
				case "hollow":
					return "border border-foreground bg-transparent";
				case "solid":
				default:
					return "";
			}
		}

		return (
			<button
				type={buttonType ? buttonType : "submit"}
				className={cn(
					"@container",
					"bg-accent",
					"bg-background",
					"h-fit w-fit",
					"h-10",
					"w-fit",
					"px-20",
					"items-center justify-center",
					"flex flex-row",
					`${type ? getType(type) : "solid"}`,
					`${shape ? getShape(shape) : "rounded-lg"}`,

					"filter hover:brightness-90 active:brightness-75 transition duration-150",
					className,

					""
				)}
				onClick={onClick}
			>
				{icon}
				{children}
			</button>
		);
	}
}
