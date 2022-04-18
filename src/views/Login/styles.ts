import styled from "styled-components";
import tw from "tailwind-styled-components";

export const LoginContainer = tw.div`
flex 
h-screen 
justify-center 
items-center
`;

export const LoginCard = tw.section`
w-[640px] 
bg-main-600 
rounded-md 
px-12
`;

const LoginLine = styled.div`
  &:before,
  &:after {
    content: "";
    flex: 1 1;

    margin: auto;
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
`;

export const LoginHeader = tw(LoginLine)`
flex
flex-row
items-center
justify-center
my-0
mx-3
mt-7
after:border-b 
after:border-main-100 
before:border-b 
before:border-main-100
`;

export const LoginTitle = tw.h1`

text-slate-100 
font-extrabold 
text-4xl 
m-4
mt-3
text-center
`;

export const SignUp = tw.p`

my-7
text-center
`;

export const SignUpLink = tw.a`
text-slate-100 
cursor-pointer 
font-bold
`;
