import "./Altitude.css";

type AltitudeProps = {
  altitude: number;
};
const Altitude: React.FC<AltitudeProps> = ({ altitude }) => {
  return (
    <pre data-testid="altitude">
      alt. <span className="altitude-value-box">{altitude}</span>m
    </pre>
  );
};

export default Altitude;
