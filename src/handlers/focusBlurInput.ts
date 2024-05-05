export function focusInput(
  setShowErr: React.Dispatch<React.SetStateAction<boolean>>
) {
  return () => setShowErr(true);
}

export function blurInput(
  setShowErr: React.Dispatch<React.SetStateAction<boolean>>
) {
  return () => setShowErr(false);
}
