export default function isFullRoom(amountOfUsers: string | null) {
  if (amountOfUsers) {
    const str = amountOfUsers.trim();
    return str == '1/2' ? false : true;
  }
}
