import tw from "tailwind-styled-components";

import EditButton from "components/molecules/UploadButton/UploadButton";
import UserPicture from "components/molecules/UserPicture/UserPicture";
import Button from "components/atoms/Button/Button";

export const SettingsHeader = tw.h1`
text-2xl
text-left
font-bold
text-main-100
`;

export const SettingTitle = tw.h3`
my-2
mt-5
text-lg

text-left
font-medium
text-main-100


`;

export const Text = tw.p`

my-2
text-main-300
font-normal
`;

export const LightUserIcon = tw(UserPicture)`
w-28
h-28
mt-3
mb-4

fill-main-300
rounded-full
object-cover
`;

export const NewUserPicture = tw.img`
w-28
h-28
mt-3
mb-4
rounded-full
object-cover
`;

export const ProfileEditButton = tw(EditButton)`
bg-main-900

`;

export const EditInput = tw.input`
m-0 
focus:outline-none 
bg-transparent 
ml-2 
w-full 
text-base 
text-main-100 
font-body 
font-normal

`;

export const InputContainer = tw.div`
flex 
justify-between 
items-center 
gap-3.5 
py-2 
px-4 
border-t-2 
border-main-500 
rounded-md 
mb-1 
mt-4
bg-main-700
`;

export const SettingsSection = tw.section`
border-t-2 
border-main-500 
my-8
`;

export const DeleteButton = tw(Button)`
mt-1
`;
