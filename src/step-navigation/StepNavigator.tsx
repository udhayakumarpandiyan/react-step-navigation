import React, { FC, useMemo, useRef, useState } from "react";
import './index.css';
import StepContent from "./StepContent";
import { Direction, Step, StepStatus } from "./types";


export interface StepNavigatorProps extends React.HTMLProps<HTMLDivElement> {
    /** An array which holds the steps to be displayed, its a required property*/
    steps?: Step[];

    /** An object which holds the current progress to be displayed, default value is 0*/
    activeStep?: number | 0;

    /** */
    showContent?: boolean;

    /** A stying of type Direction, which sets the direction of steps, default direction is horizontal*/
    direction?: Direction;

    /** An array which holds the icons to be displayed in the circle*/
    icons?: any[];

    // Styles
    /** Classname to customize styles for the step progress */
    containerClassName?: string;

    /** Classname to customize styles for the content of the step */
    contentClassName?: string;

    /** Classname to customize styles for the step circle */
    circleClassName?: string;

    /** Classname to customize styles for the step count */
    stepClassName?: string;

    /** Classname to customize styles for the step label */
    labelClassName?: string;

    /** A function to handle the  click on the step circles
     * @param step A number which indicates the current step
    */
    onStepClick?: (stepNumber: number, step?: Step) => void;

    /** A function to handle the  click on the back/previous button in the content footer
     * @param currentStep A number which indicates the current step
    */
    onBackClick?: (currentStep: number) => void;

    /** A function to handle the  click on the next button in the content footer
     * @param currentStep A number which indicates the current step
    */
    onNextClick?: (currentStep: number) => void;
    onSubmitButtonClick?: () => void;
}

/* Default properties which will get applied when no props is passed */
const defaultStepNavigatorProps: StepNavigatorProps = {
    steps: [{
        name: "Step 1",
        status: StepStatus.INPROGRESS,
        content: <>Step 1 Content</>
    },
    {
        name: "Step 2",
        status: StepStatus.DEFAULT,
        content: <>Step 2 Content</>
    }],
    direction: Direction.HORIZONTAL,
    showContent: true,
    activeStep: 0,
    icons: [],
    className: 'step-progress-main-container',
    containerClassName: 'progress-container',
    contentClassName: 'step-content',
    circleClassName: 'step-circle',
    labelClassName: 'steps-label-container',
    stepClassName: 'step-count'
};
const StepNavigator: FC<StepNavigatorProps> = (props) => {
    const stepProps: StepNavigatorProps = { ...defaultStepNavigatorProps, ...props };
    const [activeStepNumber, setActiveStepNumber] = useState<number>(() => 0);
    const navigatorSteps = stepProps.steps || [];
    let isStepContainsContent = useMemo(() => {
        let hasContent = navigatorSteps.some((step) => {
            return step.content !== null || step.content !== undefined;
        })
        return hasContent;
    }, [navigatorSteps]);

    const progressElementRef = useRef(null);


    const onStepClickHandler = (step: Step, stepNumber: number) => {
        updateStep(stepNumber);
        if (stepProps.onStepClick) {
            stepProps.onStepClick(stepNumber, step);
        }

    }

    const onPreviousButtonClick = () => {
        if (activeStepNumber >= 1) {
            updateStep(activeStepNumber - 1);
            stepProps.onNextClick && stepProps.onNextClick(activeStepNumber - 1);
        }
    }

    const onNextButtonClick = () => {
        if (activeStepNumber <= navigatorSteps.length - 2) {
            updateStep(activeStepNumber + 1);
            stepProps.onNextClick && stepProps.onNextClick(activeStepNumber + 1);
        }
        else {
            stepProps.onSubmitButtonClick && stepProps.onSubmitButtonClick();
        }
    }
    const updateStep = (stepNumber: number) => {
        const width: string = `${(100 / (navigatorSteps.length - 1)) * (stepNumber)}%`;
        if (progressElementRef?.current) {
            (progressElementRef.current as HTMLDivElement).style.width = width; // to update the progress line
        }
        setActiveStepNumber(stepNumber);
    }

    return <div id="step-progress-main-container" className={stepProps.className}>
        {navigatorSteps?.length && navigatorSteps.length > 1 && <div className={stepProps.containerClassName}>
            <div id="step-progress" ref={progressElementRef}
                className='step-progress'></div>
            {navigatorSteps?.map((step: Step, index: number) => (
                <div key={index} className='step-container'>
                    <div className={`${stepProps.circleClassName} ${activeStepNumber > index ? 'active-background' :
                        activeStepNumber === index ? 'active-border' : ''}`}
                        onClick={() => onStepClickHandler(step, index)}>
                        {
                            index + 1
                        }
                    </div>
                    <div className={stepProps.labelClassName}>
                        <p id="step-label" key={step.name || index}
                            className={activeStepNumber === index ?
                                'step-label-active' : activeStepNumber > index ?
                                    'step-label-completed' : 'step-label'}>
                            {step.name}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        }
        {isStepContainsContent && stepProps.showContent && <div className="step-content-container">
            <StepContent content={navigatorSteps[activeStepNumber].content} />
            <footer className="step-content-footer">
                {<button className={activeStepNumber === 0 ? "previous-button-hidden" : "previous-button"}
                    onClick={onPreviousButtonClick}>Previous</button>}
                <button className="next-button" onClick={onNextButtonClick}>
                    {activeStepNumber === navigatorSteps.length - 1 ? "Submit" : "Next"}
                </button>
            </footer>
        </div>
        }
    </div >
}
export default StepNavigator;