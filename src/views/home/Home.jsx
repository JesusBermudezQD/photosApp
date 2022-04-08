import React, { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import "./Home.css";

const Home = () => {
  const ApiKey = "client_id=6X46APMLaO2hfYFpqOIpbsTNTzEbeuTIYN5-_9noDrU";
  const BaseUrl = "https://api.unsplash.com/";
  const [search, setSearch] = useState("");
  const [ArrayImg, setArrayImg] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  const handleInput = (e) => setSearch(e.target.value);

  const getData = async (url) => {
    const resp = await fetch(url);
    const imgs = await resp.json();
    return imgs;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(2);
    if (search.length === 0) {
      getData(`${BaseUrl}photos?${ApiKey}&per_page=30`).then((img) => {
        setArrayImg(img);
      });
    } else if (search.length <= 2) {
      alert("mas de dos letras prro");
    } else {
      console.log(search);

      getData(
        `${BaseUrl}search/photos?${ApiKey}&page=1&query=${search}&per_page=30`
      ).then((imgs) => {
        setArrayImg(imgs.results);
        setMaxPage(imgs.total_pages);
        console.log(imgs);
      });
    }
  };

  const getMas = () => {
    if (search.length >= 3) {
      if (page <= maxPage) {
        setPage(page + 1);
        getData(
          `${BaseUrl}search/photos?${ApiKey}&page=${page}&query=${search}&per_page=30`
        ).then((imgs) => {
          setArrayImg([...ArrayImg, ...imgs.results]);
          console.log(imgs);
        });
      }
    } else {
      setPage(page + 1);
      getData(`${BaseUrl}photos?${ApiKey}&page=${page}&per_page=30`).then(
        (imgs) => {
          setArrayImg([...ArrayImg, ...imgs]);
          console.log(imgs);
        }
      );
    }
    console.log(ArrayImg);
  };

  useEffect(() => {
    getData(`${BaseUrl}photos?${ApiKey}&per_page=30`).then((img) => {
      setArrayImg(img);
      setPage(2);
    });
  }, []);

  return (
    <div className="contenedor">
      <div className="header">
        <div>
          <h1>
            Busca fotos <br /> y personaliza tu fondo al mejor estilo.
          </h1>
          <Form handleInput={handleInput} handleSearch={handleSearch} />
        </div>
      </div>

      <div className="listImg">
        {ArrayImg.length === 0 ? (
          <h3>No hay resultados para la busqueda</h3>
        ) : (
          ArrayImg.map(({ id, urls }) => {
            return <img src={urls.small} alt="" key={id} />;
          })
        )}
      </div>

      <button onClick={getMas}>Mas</button>
    </div>
  );
};

export default Home;
