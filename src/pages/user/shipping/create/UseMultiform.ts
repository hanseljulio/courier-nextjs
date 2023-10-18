import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const next = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex >= steps.length - 1) {
        return prevIndex;
      }

      return prevIndex + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return prevIndex;
      }

      return prevIndex - 1;
    });
  };

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
  };
}
