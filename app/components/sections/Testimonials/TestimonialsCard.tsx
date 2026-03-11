import { forwardRef } from "react";

type TestimonialCardProps = {
  src: string;
};

const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ src }, ref) => {
    return (
      <div ref={ref}>
        <img src={src} alt="" />
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;