export default function getAvatarTitle(name: string) {
  const names = name.split(' ');
  if (names.length == 1) {
    const firstName = names.shift();
    return firstName?.slice(0, 1).toUpperCase();
  }
  if (names.length >= 2) {
    return names
      .slice(0, 2)
      .map((name) => name.slice(0, 1).toUpperCase())
      .join('');
  }
}
