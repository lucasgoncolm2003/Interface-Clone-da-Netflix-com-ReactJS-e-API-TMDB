/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow/index';
import FeaturedMovie from './components/FeaturedMovie/index';
import Header from './components/Header/index';

export default() => {

  /*
    useState: Função ReactJS
    - salva Lista de Filmes que será exibida
    - inicia com um Array Vazio
  */
  const [movieList, setMovieList] = useState([]); // Começa como Vetor Vazio
  const [featuredData, setFeaturedData] = useState(null) // Começa Nulo
  const [blackHeader, setBlackHeader] = useState(false) //Começa False

  useEffect(()=>{
    const loadAll = async() => {
      // Pegando a Lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      // Pegando o Featured Movie
      let originals = list.filter(i=>i.slug === 'originals');
      // - só pega o Item do Array de Slug 'Originals'
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length - 1));
      // - gera um Valor Aleatório entre os Itens de Originals para ser mostrado no FeaturedMovie
      // - Math.floor: arredonda para baixo.
      // - Math.random: gera um número aleatório
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);
  /* 
  useEffect: Função do ReactJS
  - quando a Tela for carregada,
  - executa a Função digitada.
  */
  
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }
      else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return ( 
    // quando featuredData for True, gera componente FeaturedMovie
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>  
      <footer>
        Feito com <span role="img" aria-label="coração">💖</span> por Lucas Gonçalves de Oliveira Martins.
         Direitos de imagem para Netflix.
         Dados pegos do site themoviedb.org.
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  );
  /*
    Header
    Destaque
    Listas Diversas
    Rodapé

    page:
    - fez um Map na Lista de Filmes
    - pega o Item e uma Chave
    - item.title: demonstra o Título da Lista do 
    determinado item do Map.
  */
}