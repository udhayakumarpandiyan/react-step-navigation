import { FC } from "react";

interface StepContentProps {
    content?: any;
}
const StepContent: FC<StepContentProps> = (props) => {
    return <div className="step-content">
        {props.content}
    </div>
}
export default StepContent;