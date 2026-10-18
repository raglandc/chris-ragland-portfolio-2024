import type { IconType } from "react-icons";
import {
    SiReact,
    SiTypescript,
    SiCplusplus,
    SiLinux,
    SiPython,
    SiDocker,
    SiTensorflow,
} from "react-icons/si";
import { BiLogoSpringBoot } from "react-icons/bi";
import { FaGit, FaJava, FaRust } from "react-icons/fa";
import { TbSql } from "react-icons/tb";

export type Skill = {
    title: string;
    Icon: IconType;
};

export const skillsArray: Skill[] = [
    { title: "Rust", Icon: FaRust },
    { title: "Python", Icon: SiPython },
    { title: "TypeScript", Icon: SiTypescript },
    { title: "React", Icon: SiReact },
    { title: "Java", Icon: FaJava },
    { title: "Spring", Icon: BiLogoSpringBoot },
    { title: "SQL", Icon: TbSql },
    { title: "C/C++", Icon: SiCplusplus },
    { title: "Git", Icon: FaGit },
    { title: "Linux", Icon: SiLinux },
    { title: "Docker", Icon: SiDocker },
    { title: "TensorFlow", Icon: SiTensorflow },
];
