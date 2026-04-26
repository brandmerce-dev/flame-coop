interface AdmissionStepProps {
  number: number;
  title:  string;
  body:   string;
  fee?:   string;
}

export default function AdmissionStep({ number, title, body, fee }: AdmissionStepProps) {
  return (
    <div className="step">
      <div className="step__num">{number}</div>
      <div className="step__body">
        <div className="step__title">{title}</div>
        <p className="step__text">{body}</p>
        {fee && <div className="step__fee">{fee}</div>}
      </div>
    </div>
  );
}
