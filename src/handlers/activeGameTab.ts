export default function activeGameTabHandler(
  setActiveTab: React.Dispatch<React.SetStateAction<boolean>>
) {
  return () => {
    setActiveTab((active) => !active);
  };
}
