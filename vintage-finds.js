//requisitando os modulos
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o express para o postman e para usar a pagina
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

//configurando o banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/vintage", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model usuario do meu projeto
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const ProdutovintageSchema = new mongoose.Schema({
    id_produtovintage : {type : String, required : true},
    descricao : {type : String},
    marca : {type : String},
    datafabricacao : {type : Date},
    quantidadeestoque : {type : Number}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const id_produtovintage = mongoose.model("Produtovintage",ProdutovintageSchema)

//configuração dos roteamendos
//cadastrousuario
app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  
   
  const usuario = new Usuario({
    email: email,
    senha: senha
});

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

});


//rota de cadastro especifico
app.post("/cadastroprodutovintage", async (req, res) => {
    
    
    const id_produtovintage = req.body.id_produtovintage;
    const descricao = req.body.descricao;
    const marca = req.body.id_marca;
    const datafabricacao = req.body.datafabricacao;
    const quantidadeestoque = req.body.quantidadeestoque;
     
    const Produtovintage = new Produtovintage({
      id_produtovintage: id_produtovintage,
      descricao: descricao,
      marca: marca,
      datafabricacao: datafabricacao,
      quantidadeestoque: quantidadeestoque
    });
  
    try {
      const newProdutovintage = await Produtovintage.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutovintageId: newProdutovintage._id });
    } catch (error) {}
  
  });

//rota padrao
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//tem que ter o comando de listen
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

var slideIndex = 0;
showSlides(slideIndex);

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("carousel-image");
    if (n >= slides.length) {
        slideIndex = 0
    }
    if (n < 0) {
        slideIndex = slides.length - 1
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.transform = "translateX(" + (-slideIndex * 100) + "%)";
    }
}
