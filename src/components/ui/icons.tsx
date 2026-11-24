// Barcha ikonkalar Iconsax kutubxonasidan. O'lcham className (h-5 w-5) orqali beriladi.
import * as I from "iconsax-reactjs";
import type { SVGAttributes } from "react";

type Variant = "Linear" | "Outline" | "Broken" | "Bold" | "Bulk" | "TwoTone";
export type IconProps = Omit<SVGAttributes<SVGElement>, "color"> & { className?: string; variant?: Variant };
export type IconType = (props: IconProps) => React.ReactElement;

function make(Comp: I.Icon, base: Variant = "Bulk"): IconType {
  const Wrapped = ({ variant, ...rest }: IconProps) => <Comp variant={variant ?? base} color="currentColor" {...rest} />;
  Wrapped.displayName = `Iconsax(${Comp.displayName ?? "Icon"})`;
  return Wrapped;
}

// Yo'nalish va xizmat ikonkalari (Bulk — ikki tonli, bitta rangda)
export const Code = make(I.Code);
export const MagicStar = make(I.MagicStar);
export const ShieldTick = make(I.ShieldTick);
export const VideoIcon = make(I.Video);
export const CallCalling = make(I.CallCalling);
export const Hierarchy = make(I.Hierarchy);
export const Mobile = make(I.Mobile);
export const Global = make(I.Global);
export const Element3 = make(I.Element3);
export const Messages2 = make(I.Messages2);
export const Chart2 = make(I.Chart2);
export const Routing2 = make(I.Routing2);
export const MessageText = make(I.MessageText);
export const Scan = make(I.Scan);
export const Car = make(I.Car);
export const Headphone = make(I.Headphone);
export const FingerScan = make(I.FingerScan);
export const Magicpen = make(I.Magicpen);
export const Lock = make(I.Lock);
export const Routing = make(I.Routing);
export const Driver = make(I.Driver);
export const Driver2 = make(I.Driver2);
export const Activity = make(I.Activity);
export const Data = make(I.Data);
export const Eye = make(I.Eye);
export const Setting2 = make(I.Setting2);
export const Hierarchy3 = make(I.Hierarchy3);
export const Wifi = make(I.Wifi);
export const Monitor = make(I.Monitor);
export const Cpu = make(I.Cpu);
export const People = make(I.People);
export const CloudConnection = make(I.CloudConnection);
export const Speedometer = make(I.Speedometer);
export const Buildings2 = make(I.Buildings2);
export const Notification = make(I.Notification);
export const Danger = make(I.Danger);
export const User = make(I.User);
export const TrendUp = make(I.TrendUp);
export const Call = make(I.Call);
export const Sms = make(I.Sms);
export const Location = make(I.Location);
export const Clock = make(I.Clock);
export const TickCircle = make(I.TickCircle);
export const Star = make(I.Star1, "Bold");
export const QuoteUp = make(I.QuoteUp, "Bold");
export const Send = make(I.Send2);
export const Windows = make(I.Windows);
export const CommandSquare = make(I.CommandSquare);
export const Key = make(I.Key);
export const LampCharge = make(I.LampCharge);
export const Alarm = make(I.Alarm);
export const Teacher = make(I.Teacher);
export const Radar = make(I.Radar);
export const SecurityUser = make(I.SecurityUser);
export const SecurityCard = make(I.SecurityCard);
export const CalendarTick = make(I.CalendarTick);
export const Login = make(I.Login);
export const Printer = make(I.Printer);
export const ScanBarcode = make(I.ScanBarcode);
export const Instagram = make(I.Instagram, "Linear");

// UI ikonkalari (Linear — ingichka chiziqli)
export const ArrowRight = make(I.ArrowRight, "Linear");
export const ArrowUpRight: IconType = ({ className, ...rest }) => (
  <I.ArrowRight variant="Linear" color="currentColor" className={`-rotate-45 ${className ?? ""}`} {...rest} />
);
export const ArrowUp = make(I.ArrowUp, "Linear");
export const ArrowDown2 = make(I.ArrowDown2, "Linear");
export const ArrowRight2 = make(I.ArrowRight2, "Linear");
export const Menu = make(I.HamburgerMenu, "Linear");
export const Close = make(I.CloseCircle, "Linear");
export const Add = make(I.Add, "Linear");
export const Refresh = make(I.Refresh2, "Linear");
