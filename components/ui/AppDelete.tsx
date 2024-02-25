import { useRef, useState } from 'react';
import { AppIconSprite } from './Icon_sprite/AppIconSprite';

interface AppDelteProps {
  deleted: boolean
  onClick: (deleted: boolean) => void
}

export function AppDelete({ deleted = false, onClick } : AppDelteProps) {
  const [deleting, setDelete] = useState(deleted);
  const [hover, setHover] = useState(false);
  const iconRef = useRef(null);

  const mouseClickHandler = async () => {
    const del = !deleting;
    onClick(del);
    setDelete(del);
  };

  return (
    <div
      className="deleted"
      onClick={mouseClickHandler}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {
        !deleting
        ? (
<AppIconSprite
  ref={iconRef}
  name={`delete${hover ? '-active' : ''}`}
/>
)
        : <span>Восстановить</span>
      }
    </div>
  );
}
