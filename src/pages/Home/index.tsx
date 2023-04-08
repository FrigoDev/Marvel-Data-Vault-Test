import MarvelHomePromo from "../../assets/img/MarvelHomeLogo.jpeg";
import "../../components/ContentCards/GenericCard.css";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-container">
      <div className="description-section">
        <h1 className="title-promo">Marvel Data Vault</h1>
        <p className="text-promo">
          Are you a Marvel fan looking to explore the vast universe of
          superheroes and villains? Look no further than our Marvel Data Vault!
        </p>
      </div>
      <figure className="promo-img-container">
        <img
          className="promo-img"
          src={MarvelHomePromo}
          alt="Marvel Home Promo"
        />
      </figure>
      <section className="description-section">
        <h2 className="title-promo">Explore the Marvel Universe</h2>
        <p className="text-promo">
          Marvel Data Vault is a web application that allows you to explore the
          Marvel Universe. You can search for your favorite Marvel characters,
          comics, and stories. You can also bookmark your favorite characters,
          comics, and stories to view later.
        </p>
      </section>
      <section className="card-section">
        <h2 className="title-promo">Marvel Data Vault Features</h2>
        <div className="container">
          <div className="cards-container">
            <div className="column">
              <div className="card">
                <img
                  className="card-image"
                  src="https://i.guim.co.uk/img/media/e191a8c89021d04e57d54dadda6a12b79a8c86ea/0_26_800_480/master/800.jpg?width=1200&quality=85&auto=format&fit=max&s=2368d242e91f23f896d63fb5bfaaf1b2"
                  alt="Marvel Characters"
                />
              </div>
            </div>
            <div className="column">
              <div className="card">
                <img
                  className="card-image"
                  src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91uDfBjwfFL.jpg"
                  alt="Marvel Characters"
                />
              </div>
            </div>
            <div className="column">
              <div className="card">
                <img
                  className="card-image"
                  src="https://www.akiracomics.com/imagenes/poridentidad?identidad=33bbca32-7b6e-48e1-9210-dd8e4d334c21&ancho=850&alto="
                  alt="Marvel Characters"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
