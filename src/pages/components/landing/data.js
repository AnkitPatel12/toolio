import {
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  FaceSmileIcon
} from "@heroicons/react/24/solid";
  
  import colorful_ribbon2 from "../../../../public/img/colorful_ribbon2.png";
  
  const benefitOne = {
    title: "Let's build the future together",
    desc: "Toolio is made for dreamers. We're here to help you build the future with the power of the community behind you.",
    image: colorful_ribbon2,
    bullets: [
      {
        title: "An open marketplace for projects",
        desc: "Get access to whatever you need, whether it be a developer, designer, compute or storage.",
        icon: <FaceSmileIcon />,
      },
      {
        title: "Streamline your project management",
        desc: "Toolio helps you manage your projects, tasks, and team members all in one place.",
        icon: <ChartBarSquareIcon />,
      },
      {
        title: "Create a project in seconds",
        desc: "Projects are easy to create. Getting the right tools should be too.",
        icon: <CursorArrowRaysIcon />,
      },
    ],
  };
  
  
  export { benefitOne };
