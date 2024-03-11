import dynamic from "next/dynamic";

export const Github = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiFillGithub)
);
export const Twitter = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiOutlineTwitter)
);
export const Instagram = dynamic(() =>
  import("react-icons/ai").then((mod) => mod.AiFillInstagram)
);
export const Linkedin = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaLinkedinIn)
);