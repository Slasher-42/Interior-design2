import {
  EnvelopeSimple,
  LockSimple,
  User as UserPh,
  Eye as EyePh,
  EyeSlash,
  ArrowLeft,
  FacebookLogo,
  XLogo,
  GoogleLogo,
  MagnifyingGlass,
} from "@phosphor-icons/react";

const weight = "regular";

export function MailIcon() {
  return <EnvelopeSimple weight={weight} />;
}

export function LockIcon() {
  return <LockSimple weight={weight} />;
}

export function UserIcon() {
  return <UserPh weight={weight} />;
}

export function EyeIcon() {
  return <EyePh weight={weight} />;
}

export function ArrowLeftIcon() {
  return <ArrowLeft weight={weight} />;
}

export function EyeOffIcon() {
  return <EyeSlash weight={weight} />;
}

export function FacebookIcon() {
  return <FacebookLogo weight="fill" />;
}

export function XIcon() {
  return <XLogo weight="fill" />;
}

export function GoogleIcon() {
  return <GoogleLogo weight="bold" />;
}

export function SearchIcon() {
  return <MagnifyingGlass weight={weight} />;
}
