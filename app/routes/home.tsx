import type { Route } from './+types/home';
import { Welcome } from '~/welcome/welcome';
import { useTranslation } from 'react-i18next';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("vendure");

  return (
    <>
      <h1>{t('title')}</h1>
      <Welcome message={loaderData.message} />
    </>
  );
}

