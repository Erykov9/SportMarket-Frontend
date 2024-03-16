import styles from "./Advertisement.module.scss";

interface IAdvertisementImages {
  src: string;
  href: string;
}

const images: IAdvertisementImages[] = [
  {
    src: "/assets/advs/adv1.jpg",
    href: "https://www.coca-cola.com/us/en",
  },
  {
    src: "/assets/advs/adv2.jpg",
    href: "https://mediamarkt.pl/",
  },
  {
    src: "/assets/advs/adv3.jpg",
    href: "https://steelseries.com/",
  },
];

const Advertisement = () => {
  const randomImageIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomImageIndex];

  return (
    <div className={styles.adv}>
      <img src={selectedImage.src} alt={selectedImage.href.split(".")[2]}></img>
      <p>ad</p>
    </div>
  );
};

export default Advertisement;
