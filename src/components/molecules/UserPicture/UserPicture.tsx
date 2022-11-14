import UserIcon from "assets/UserIcon";
import { useUser } from "lib/auth";

interface UserPictureProps {
  className?: string;
}

const UserPicture = ({ className }: UserPictureProps) => {
  const { user } = useUser();
  const avatarUrl = user?.avatarUrl;

  return avatarUrl ? (
    <img src={avatarUrl} alt="user profile" className={className} />
  ) : (
    <UserIcon className={className} />
  );
};

export default UserPicture;
