import Image from 'next/image';

interface AvatarProps {
  avatarURL?: string;
  name?: string;
  size?: number;
}

export const Avatar = ({ avatarURL, name, size = 32 }: AvatarProps) => {
  const firstLetter = name?.charAt(0)?.toUpperCase();

  return avatarURL ? (
    <Image
      src={avatarURL}
      alt="user avatar"
      width={size}
      height={size}
      className="h-full w-full rounded-full object-cover"
    />
  ) : (
    <p className="text-[14px] font-700 leading-[1.28]">{firstLetter}</p>
  );
};
