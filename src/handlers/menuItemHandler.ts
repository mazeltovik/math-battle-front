export default function menuItemHandler(
  menuParentRef: React.RefObject<HTMLUListElement>
) {
  return function (event: React.FormEvent<HTMLUListElement>) {
    const childs = menuParentRef.current?.children;
    if (childs) {
      const arrOfChilds = Array.from(childs);
      arrOfChilds.forEach((item) => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });
    }
    const target = event.target as HTMLElement;
    const menuItem = target.closest('li') as HTMLLIElement;
    menuItem.classList.add('active');
  };
}
