@echo off

:: Navega para o diretório do frontend e inicia o servidor em uma nova janela
echo Iniciando o frontend...
cd frontend
start cmd /k "npm start"
cd ..

:: Navega para o diretório do backend e inicia o backend
echo Iniciando o backend...
cd backend

:: Sobe os serviços Docker
docker-compose up -d

:: Inicia a aplicação Spring Boot
echo Iniciando a aplicação Spring Boot...
start cmd /k "mvn spring-boot:run"
:: OU use o comando abaixo, se preferir executar o JAR diretamente:
:: start cmd /k "java -jar target/compile_io.jar"

cd ..

:: Informa que os serviços foram iniciados
echo Frontend e Backend iniciados com sucesso!