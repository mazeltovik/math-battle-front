export default function activeGameTabHandler(
  toggleRef: React.RefObject<HTMLDivElement>
) {
  return () => {
    toggleRef.current?.parentElement?.classList.toggle('active');
  };
}
