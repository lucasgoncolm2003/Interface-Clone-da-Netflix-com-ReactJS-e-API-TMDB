/* eslint-disable default-case */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-anonymous-default-export */
const API_KEY = `3618988e9543788a00448fa620668376`;
/* 
- API_KEY: Chave da API com sua Versão do TMDB
- API_BASE: Requisição da API do TMDB
*/
const API_BASE = `https://api.themoviedb.org/3`;

/*
- Originais da Netflix
- Recomendados para você (Trending)
- Em Alta (Top Rated)
- Lista de Filmes de Comédia
- Lista de Filmes de Terror
- Lista de Filmes de Romance
- Lista de Filmes de Ação
- Lista de Filmes de Documentários
*/

/*
    Criação de Função Auxiliar
    - Fetch na URL que deseja pegar
    - Envia um endpoint com a API_BASE (Requisição)
    - retornar o JSON de resultado da Requisição
    ==============================
*/
const basicFetch = async(endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}
/*
    ==============================
    async-await:
    -----> const req = await fetch(`${API_BASE}${endpoint}`);
    - Realiza Requisição para Serviço Externo, como acessar um Site
    - É preciso esperar uma Resposta após Execução de Linha de Código
    -----> const json = await req.json();
    - depois de receber a Resposta, executa esse Comando, esperando a resposta.
    - await: "espere a resposta da sua requisição antes de prosseguir para a próxima linha"
*/


export default {
    // Função que coloca cada Lista em seu local
    getHomeList: async() => { //Lista da Página Principal
        // async: Função Assíncrona
        // Lista de Exibição no Site
        return [
            {
                slug: `originals`,
                title: `Originais do Netflix`,
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
                /*
                    Filtragem de Seriados por Network, específicos da Netflix
                    Parâmetros basicFetch
                    - with_network=213: A rede 213 corresponde a Rede da Netflix.
                    - language=pt-BR: linguagem em Português do Brasil, se não tiver, fica inglês mesmo.
                    - api_key=${API_KEY}: solicita a Chave de Acesso da API para fazer a Requisição.
                */
            },
            {
                slug: `trending`,
                title: `Recomendados para Você`,
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
                /*
                    Todos os Filmes em Trending nessa semana
                    - language=pt-BR: linguagem em Português do Brasil, se não tiver, fica inglês mesmo.
                    - api_key=${API_KEY}: solicita a Chave de Acesso da API para fazer a Requisição.
                */
            },
            {
                slug: `topreated`,
                title: `Em Alta`,
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
                /*
                    Todos os Filmes em alta
                    - language=pt-BR: linguagem em Português do Brasil, se não tiver, fica inglês mesmo.
                    - api_key=${API_KEY}: solicita a Chave de Acesso da API para fazer a Requisição.
                */
            },
            {
                slug: `in_general`,
                title: `Filmes em Geral`,
                items: await basicFetch(`/discover/movie?with_genres=28?language=pt-BR&api_key=${API_KEY}`)
                /*
                    Listagem de Filmes de Ação
                    - with_genres=28: parâmetro de Gênero de Filme, em que 28 é o Código do Gênero de Ação.
                    - language=pt-BR: linguagem em Português do Brasil, se não tiver, fica inglês mesmo.
                    - api_key=${API_KEY}: solicita a Chave de Acesso da API para fazer a Requisição.
                */
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        // Função Assíncrona que recebe Identidade do Filme e seu Tipo (Filme ou Seriado)
        let info = {};
        if(movieId){
            switch(type) {
            case 'movie':
                //Se for um Filme, segue o Endpoint padrão da API para filmes: /movie/${movieId}
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
            break;
            case 'tv':
                //Se for uma Série, segue o Endpoint padrão da API para séries: /tv/${movieId}
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
            break;
            default:
                info=null;
            }
        }
        return info;
    }
}