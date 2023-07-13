# Desafio Técnico Eclipse 

## API de ofertas

### Como inicializar a aplicação

1. Faça o clone do repositório `git clone https://github.com/abelsouzacosta/eclipse.git`
2. Entre no repositório `cd eclipse`
3. Inicialize a aplicação com docker `docker compose up --build`
4. A aplicação será inicializada na porta 3000 `http://localhost:3000` 
e a adocumentação estará disponível `http://localhost:3000/api`.

O foco ao construir esssa aplicação foi a velocidade, precisava fazer o máximo possível no menor espaço
de tempo uma vez que estou em períodos de provas na fdaculdade.

## Possíveis melhorias

1. Não utilização de uma framework: O NestJs, framework utilizado para a construção do projeto, é bastante flexível
porém não tanto quanto construir a aplicação usando apenas o express.
2. Utilização de TDD: Sim, escrever testes torna o desenvolvimento mais rápido, mas como eu já tinha um 
modelo minimamente definido na minha cabeça e decidi usar NestJs + Docker para o desenvolvimento eu precisaria 
de etapas de configuração extras que que não tive tempo de fazer e por isso preferi por entregar sem testes
mas de antemão gostaria de deixar claro que custumo utilizar testes, inclusive com o NestJs
3. Bancos de Dados: De preferência utilizar multiplos bancos de dados nesse projeto o que me 
permitiria usar uma modelagem distinta, colocando as moedas e usuários dentro de um banco relacional
e as ofertas e carteiras dentro de um banco de dados não relacional
4. Separation Of Concerns: Na arquitetura que eu utilizei a regra de negócio para expirar as ofertas do
dia anterior são feitas através de uma cron, essa cron é contruída juntamente com o resto da API
porém é mais efetivo que essas responsabilidades diferentes ficassem separadas umas das outras
então a CRON seria construída a parte.


