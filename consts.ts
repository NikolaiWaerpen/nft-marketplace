import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const MAIL_TO = "hei@tordentorg.no";
export const MAX_QUANTITY = 1000;
export const ACCOUNT_ADDRESS = "0x74D27fA12F8203170f2E4a43bA7455DB906777F2";
export const TESTNET = false;
export const OPENSEA_API_URL = `https://${
  TESTNET ? "testnets-" : ""
}api.opensea.io/api/v1`;
export const NETWORK = TESTNET ? "testnet" : "mainnet";
export const NAVIGATION = {
  main: [
    { name: "Hjem", href: "/" },
    { name: "Utforsk", href: "/explore-collections" },
    { name: "Om oss", href: "/about" },
  ],
  social: [
    {
      name: "Github",
      href: "https://github.com/NikolaiWaerpen/",
      icon: faGithub,
    },
    // {
    //   name: "Facebook",
    //   href: "",
    //   icon: faFacebookF,
    // },
    // {
    //   name: "Instagram",
    //   href: "https://www.instagram.com/nikolaiwaerpen/",
    //   icon: faInstagram,
    // },
    // {
    //   name: "Twitter",
    //   href: "https://twitter.com/waerpen",
    //   icon: faTwitter,
    // },
  ],
};
