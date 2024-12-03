import express from "express"; // Importa o framework Express para criar aplicações web
import multer from "multer"; // Importa o Multer para lidar com o envio de arquivos (uploads)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções para listar, criar e fazer upload de imagens de posts
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados pelo Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Define o diretório de destino para os arquivos
    cb(null, 'uploads/'); // Define a pasta "uploads" como destino
  },
  filename: function (req, file, cb) { // Define o nome do arquivo
    cb(null, file.originalname); // Utiliza o nome original do arquivo enviado
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições JSON
  app.use(express.json()); // Permite que a aplicação entenda dados em formato JSON

  app.use(cors(corsOptions));

  // Rota para listar todos os posts (GET /posts)
  app.get("/posts", listarPosts); // Chama a função listarPosts para retornar todos os posts

  // Rota para criar um novo post (POST /posts)
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost para criar um novo post

  // Rota para fazer upload de uma imagem (POST /upload)
  app.post("/upload", upload.single("imagem"), uploadImagem); // Utiliza o Multer para fazer upload de um único arquivo com o nome "imagem" e chama a função uploadImagem para processar a imagem

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função de rotas para ser utilizada em outros módulos