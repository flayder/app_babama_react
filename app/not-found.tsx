import { AppLink } from '@/components/ui/AppLink';
import { ROUTES } from '@/params';

export default function NotFound() {
  return (
    <div>
      <h2>Страница не найдена</h2>
      <p>
        <AppLink href={ROUTES.INDEX}>Вернуться на главную</AppLink>
      </p>
    </div>
  );
}
