# Meu Site Pessoal

Este é um site pessoal moderno e responsivo que você pode usar para mostrar suas redes sociais e projetos.

## Características

- Design moderno e limpo
- Totalmente responsivo (funciona em dispositivos móveis e desktop)
- Animações suaves
- Seção de perfil com foto
- Links para redes sociais
- Seção de projetos
- Fácil de personalizar

## Como Personalizar

1. Edite o arquivo `index.html`:

   - Substitua "Seu Nome" pelo seu nome
   - Atualize a descrição na classe "bio"
   - Substitua a URL da imagem de perfil
   - Atualize os links das redes sociais com suas URLs
   - Adicione seus próprios projetos

2. Personalize as cores no arquivo `styles.css`:
   - Edite as variáveis CSS no início do arquivo para mudar as cores do site

## Como Hospedar no GitHub

1. Crie um novo repositório no GitHub
2. Inicialize o Git no seu projeto local:
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit"
   ```
3. Conecte seu repositório local ao GitHub:
   ```bash
   git remote add origin URL_DO_SEU_REPOSITORIO
   git push -u origin main
   ```
4. Vá para as configurações do seu repositório no GitHub
5. Na seção "Pages", selecione a branch "main" como fonte
6. Seu site estará disponível em `https://vteze.space`

## Domínio Personalizado

Este site está configurado para usar o domínio personalizado `vteze.space`. Para configurar seu próprio domínio:

1. Compre um domínio em um registrador de domínios
2. Configure os registros DNS:
   - Adicione registros A apontando para os IPs do GitHub Pages
   - Adicione um registro CNAME para o subdomínio www
3. Crie um arquivo CNAME na raiz do projeto com seu domínio
4. Configure o domínio nas configurações do GitHub Pages

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Font Awesome (para ícones)

## Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar conforme suas necessidades.
