import { StateWithBooking } from "./StateWithBooking";

interface Props {
  onCheckIn: () => void;
}

export function StateCheckIn({ onCheckIn }: Props) {
  return <StateWithBooking onCheckIn={onCheckIn} showCheckInButton />;
}
