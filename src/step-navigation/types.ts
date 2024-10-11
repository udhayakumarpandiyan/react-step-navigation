import { ReactNode } from "react";

export enum StepStatus {
    DEFAULT = 0,
    INPROGRESS = 1,
    SKIPPED = 2,
    COMPLETED = 3,
    FAILED = 4,
    DISABLED = 5,
}
export enum Direction {
    "horizontal" = "horizontal",
    "vertical" = "vertical"
}

export interface Step {
    content?: ReactNode | HTMLElement;
    status?: StepStatus;
    name?: string;
    icon?: any;
}