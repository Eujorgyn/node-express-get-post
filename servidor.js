const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <meta charset="UTF-8">
      <title>Teste GET e POST</title>
      <body>
        <h1>GET / — acesso realizado com sucesso</h1>
        <p>Digite dois números para testar a requisição POST.</p>

        <form action="/soma" method="POST">
          <label>
            Primeiro número:
            <input type="number" name="a" step="any" required>
          </label>
          <br><br>
          <label>
            Segundo número:
            <input type="number" name="b" step="any" required>
          </label>
          <br><br>
          <button type="submit">Somar usando POST</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/soma', (req, res) => {
  const { a, b } = req.body;

  if (
    typeof a !== 'string' || typeof b !== 'string' ||
    a.trim() === '' || b.trim() === '' ||
    !Number.isFinite(Number(a)) || !Number.isFinite(Number(b))
  ) {
    return res.status(400).send('Informe dois números válidos.');
  }

  const resultado = Number(a) + Number(b);

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <meta charset="UTF-8">
      <title>Resultado POST</title>
      <body>
        <h1>POST /soma — acesso realizado com sucesso</h1>
        <p>Resultado da soma: <strong>${resultado}</strong></p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Servidor disponível em http://localhost:3000');
});