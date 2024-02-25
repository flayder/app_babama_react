import Image from 'next/image';

type AppImageProps = React.ComponentProps<typeof Image>

export function AppImage({ alt, ...props }: AppImageProps) {
  return <Image {...props} alt={alt} />;
}
